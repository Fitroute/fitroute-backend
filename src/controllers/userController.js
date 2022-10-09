const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const status = require("http-status");

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

const bmi = async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    const bmi = user.weight / Math.pow(user.height, 2);
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
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const request = req.body;
    await User.findByIdAndUpdate(req.params.id, request)
      .then((user) => {
        res
          .status(status.OK)
          .json({ message: "User updated successfully", user });
      })
      .catch((err) => {
        res.status(status.BAD_REQUEST).json("Error: " + err);
      });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdDelete(req.params.id)
      .then((user) => {
        res
          .status(status.OK)
          .json({ message: "User deleted successfully", user });
      })
      .catch((err) => {
        res.status(status.BAD_REQUEST).json("Error: " + err);
      });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { name, surname, email, password, country, city } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(status.BAD_REQUEST).json({
      message: "Registration failed",
      error: "Email already exists",
    });
    return;
  }
  try {
    //Password Hashing
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    //Create User
    const user = new User({ ...req.body, password: hash });
    user.save().then(() => {
      res.status(status.CREATED).json({
        message: "User created successfully",
      });
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Find user by email
    await User.findOne({ email }).then((user) => {
      // Checks users password
      const isValid = bcrypt.compareSync(password, user.password);
      if (!user || !isValid) {
        res.status(status.BAD_REQUEST).json({
          message: "Login failed",
          error: "Email or password is wrong",
        });
        return;
      }
      //Create token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.header("Authorization", token).status(status.OK).json({
        message: "User logged in successfully",
        accessToken: token,
      });
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(status.OK).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
module.exports = { register, login, bmi, getAllUsers, updateUser, deleteUser };
