const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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
  const { weight, height, age, id } = req.body;
  const user = await User.findById(id);
  user.weight = weight;
  user.height = height;
  user.age = age;
  await user.save();
  try {
    const bmi = weight / (height * height);
    let bmiStatus = "Not Calculated";
    if (age > 20) {
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
    }
    res.status(200).json({
      message: bmiStatus,
      bmi,
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  const { name, surname, email, password, country, city } = req.body;
  //Password Hashing
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  //Create User
  const user = new User({ ...req.body, password: hash });
  try {
    user.save().then(() => {
      res.status(200).json({
        message: "User created successfully",
        user,
      });
    });
  } catch (error) {
    res.status(401).json({
      message: "User not successful created",
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
        res.status(401).json({
          message: "Login failed",
          error: "Email or password is wrong",
        });
        return;
      }
      res.status(200).json({
        message: "User logged in successfully",
        user,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
module.exports = { register, login, bmi };
