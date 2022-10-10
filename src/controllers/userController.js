const bcrypt = require("bcrypt");
const status = require("http-status");
const {
  insert,
  loginUser,
  list,
  update,
  removeUser,
} = require("../services/userService");

const postService = require("../services/postService");
const areaService = require("../services/sportAreaService");
const pathService = require("../services/pathRouteService");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/helper");

// const uploadUserImage = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     user.image = req.file.buffer;
//     await user.save();
//     res.status(200).json({
//       message: "Image uploaded successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// };

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
  await update(req.user?._id, req.body)
    .then((user) => {
      res
        .status(status.OK)
        .json({ message: "User updated successfully", user });
    })
    .catch((e) => {
      res.status(status.BAD_REQUEST).json("Error: " + e);
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
  await User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(status.BAD_REQUEST).json({
        message: "Registration failed",
        error: "Email already exists",
      });
      return;
    } else {
      //Password Hashing
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      insert(req.body)
        .then((response) => {
          res.status(status.CREATED).json({
            message: "User registered successfully",
            user: response,
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
  await loginUser(email)
    .then((user) => {
      // Checks users password
      const isValid = bcrypt.compareSync(password, user.password);
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
  updateUser,
  deleteUser,
};
