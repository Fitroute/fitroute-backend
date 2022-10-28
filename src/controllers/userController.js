const status = require("http-status");
const uuid = require("uuid");
const path = require("path");
const {
  insert,
  checkUser,
  list,
  checkUserByID,
  updateWithEmail,
  update,
  removeUser,
  removeFromDB,
} = require("../services/userService");

const postService = require("../services/postService");
const areaService = require("../services/sportAreaService");
const pathService = require("../services/pathRouteService");
const image = require("../services/imageService");
const {
  generateAccessToken,
  generateRefreshToken,
  passwordHash,
  passwordCompare,
  sendMail,
  createFolder,
} = require("../utils/helper");

const uploadImage = async (req, res) => {
  if (!req.files.image) {
    res.status(status.BAD_REQUEST).json({
      message: "Upload failed",
      error: "Image is required",
    });
    return;
  }
  const dir = "src/uploads/users/";
  createFolder(dir);
  const fileName = `${req.user._id}${path.extname(req.files.image.name)}`;
  image
    .singleImageUpload(`${dir}/${fileName}`, req.files.image)
    .then((_) => {
      update(req.user._id, { image: fileName })
        .then((user) => {
          res.status(status.OK).json({
            message: "Upload successfully",
            user,
          });
        })
        .catch((e) => {
          res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "Upload success but update failed",
            error: e.message,
          });
        });
    })
    .catch((e) => {
      res.status(status.BAD_REQUEST).json({
        message: "Upload failed",
        error: e.message,
      });
    });
};

const getBMI = async (req, res) => {
  list({ _id: req.user?._id })
    .then((user) => {
      const bmi = user[0].weight / (user[0].height * user[0].height);
      let bmiStatus = "Not Calculated";
      switch (true) {
        case bmi < 16.0:
          bmiStatus = "Severely Underweight";
          break;
        case bmi < 18.5:
          bmiStatus = "Underweight";
          break;
        case bmi < 25.0:
          bmiStatus = "Normal";
          break;
        case bmi < 30.0:
          bmiStatus = "Overweight";
          break;
        case bmi < 35.0:
          bmiStatus = "Moderately Obese";
          break;
        case bmi < 40.0:
          bmiStatus = "Severely Obese";
          break;
        case bmi > 40.0:
          bmiStatus = "Morbidly Obese";
          break;
      }
      res.status(status.OK).json({
        message: bmiStatus,
        bmi,
      });
    })
    .catch((e) => {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: e.message,
      });
    });
};

const updateUser = async (req, res) => {
  await checkUser({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(status.BAD_REQUEST).json({
        message: "Update failed",
        error: "Email already exists",
      });
      return;
    }
    update(req.user?._id, req.body)
      .then((user) => {
        res
          .status(status.OK)
          .json({ message: "User updated successfully", user });
      })
      .catch((e) => {
        res.status(status.BAD_REQUEST).json("Error: " + e);
      });
  });
};

const sendCode = async (req, res) => {
  checkUser({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(status.BAD_REQUEST).json({
        message: "Send code failed",
        error: "Email does not exist",
      });
      return;
    }
    const code = uuid.v4()?.split("-")[0] || `fit-${new Date().getTime()}`;
    updateWithEmail({ email: req.body.email }, { resetCode: code }).then(
      (response) => {
        sendMail({
          email: req.body.email,
          subject: "Verify Code",
          username: user.name,
          message: code,
          emailType: "resetPassword",
        });
        res.status(status.OK).json({
          message: "Send code successfully",
          code,
        });
      }
    );
  });
};

const verifyEmail = async (req, res) => {
  await checkUserByID(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(status.BAD_REQUEST).json({
          message: "Invalid link",
        });
        return;
      }
      checkUser({ verifyLink: req.params.token }).then((token) => {
        if (!token) {
          res.status(status.BAD_REQUEST).json({
            message: "Invalid link",
          });
          return;
        }
        update(user._id, { isConfirmed: true }).then((response) => {
          removeFromDB(user.email, { verifyLink: "" }).then((response) => {
            res.status(status.OK).json({
              message: "Email verified succesfully",
              response,
            });
          });
        });
      });
    })
    .catch((err) => {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        message: "Invalid link",
        error: err,
      });
    });
};

const resetPassword = async (req, res) => {
  checkUser({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(status.BAD_REQUEST).json({
        message: "Reset password failed",
        error: "Email does not exist",
      });
      return;
    }
    //TODO Date.now - user.updatedAt > 5 minutes olarak ayarlanacak
    //TODO kodun süresi dolmuşsa hata döndürülecek süresi dolan kodu dbden silinecek
    const unixtimeAdd5Minutes = user.updatedAt.getTime() + 5 * 60 * 1000;
    if (unixtimeAdd5Minutes < new Date().getTime()) {
      removeFromDB(user.email, { resetCode: "" }).then((response) => {
        res.status(status.BAD_REQUEST).json({
          message: "Reset password failed",
          error: "Code expired",
        });
      });
      return;
    }

    if (user.resetCode !== req.body.code) {
      res.status(status.BAD_REQUEST).json({
        message: "Reset password failed",
        error: "Code is incorrect",
      });
      return;
    }
    updateWithEmail(
      { email: req.body.email },
      { password: passwordHash(req.body.password) }
    ).then((response) => {
      removeFromDB(req.body.email, { resetCode: "" }).then((response) => {
        res.status(status.OK).json({
          message: "Reset password successfully",
          response,
        });
      });
    });
  });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  await checkUser({ email: req.user?.email }).then((user) => {
    const isValid = passwordCompare(oldPassword, user.password);
    if (!isValid) {
      res.status(status.BAD_REQUEST).json({
        message: "Change password failed",
        error: "Old password is incorrect",
      });
      return;
    }
    update(req.user?._id, { password: passwordHash(newPassword) })
      .then((user) => {
        res.status(status.OK).json({
          message: "Change password successfully",
          user,
        });
      })
      .catch((e) => {
        res.status(status.INTERNAL_SERVER_ERROR).json("Error: " + e);
      });
  });
};

const deleteUser = async (req, res) => {
  await removeUser(req.user?._id)
    .then((user) => {
      res
        .status(status.OK)
        .json({ message: "User deleted successfully", user });
    })
    .catch((e) => {
      res.status(status.BAD_REQUEST).json("Error: " + err);
    });
};

const register = async (req, res) => {
  await checkUser({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(status.BAD_REQUEST).json({
        message: "Registration failed",
        error: "Email already exists",
      });
      return;
    } else {
      // Password Hashing
      req.body.password = passwordHash(req.body.password);
      insert(req.body)
        .then((response) => {
          // Send Verify Email
          const token = uuid.v4();
          const link = `http://${process.env.BASE_URL}:${process.env.PORT}/users/verify/${response._id}/${token}`;

          updateWithEmail(
            { email: req.body.email },
            { verifyLink: token }
          ).then((user) => {
            sendMail({
              email: req.body.email,
              subject: "Verify Email",
              username: user.name,
              message: link, // email verify template will create
              emailType: "emailVerification", // file name in utils/views
            });
            res.status(status.CREATED).json({
              message: "User registered successfully, please check your email!",
              user: user,
            });
          });
        })
        .catch((e) => {
          res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred",
            error: e.message,
          });
        });
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  await checkUser({ email: email })
    .then((user) => {
      // Check Users Confirmed
      if (!user.isConfirmed) {
        res.status(status.BAD_REQUEST).json({
          message: "Please check your email to login",
          error: "Email does not verified",
        });
        return;
      }
      // Checks users password
      const isValid = passwordCompare(password, user.password);
      if (!isValid) {
        res.status(status.BAD_REQUEST).json({
          message: "Login failed",
          error: "Email or password is wrong",
        });
        return;
      }
      //Create token
      user = {
        ...user.toObject(),
        token: {
          accessToken: generateAccessToken(user),
          refreshToken: generateRefreshToken(user),
        },
      };
      delete user.password;
      res.status(status.OK).json({
        message: "User logged in successfully",
        user,
      });
    })
    .catch((e) => {
      res.status(status.BAD_REQUEST).json({
        message: "Login failed",
        error: "Email or password is wrong",
      });
    });
};

const getAllUsers = async (req, res) => {
  await list()
    .select("-password")
    .then((users) => {
      res.status(status.OK).json({
        message: "Users retrieved successfully",
        length: users.length,
        users,
      });
    })
    .catch((e) => {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: e.message,
      });
    });
};

const getPostList = async (req, res) => {
  postService
    .list({ createdBy: req.user?._id })
    .then((posts) => {
      res.status(status.OK).json(posts);
    })
    .catch((e) => {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: e.message,
      });
    });
};

const getAreaList = async (req, res) => {
  areaService
    .list({ createdBy: req.user?._id })
    .then((areas) => {
      res.status(status.OK).json(areas);
    })
    .catch((e) => {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: e.message,
      });
    });
};

// Get All PathRoute by CreatedBy
const getAllPathRoutesByCreatedBy = async (req, res) => {
  pathRouteService
    .list({ createdBy: req.user?._id })
    .then((pathRoutes) => {
      res.status(status.OK).json(pathRoutes);
    })
    .catch((e) => {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: e.message,
      });
    });
};

module.exports = {
  register,
  login,
  getBMI,
  getAllUsers,
  getPostList,
  getAreaList,
  getAllPathRoutesByCreatedBy,
  sendCode,
  verifyEmail,
  resetPassword,
  changePassword,
  updateUser,
  deleteUser,
  uploadImage,
};
