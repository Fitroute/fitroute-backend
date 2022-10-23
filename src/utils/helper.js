const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const fs = require("fs");

const passwordHash = (password) => {
  //Password Hashing
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const passwordCompare = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const sendMail = (email, subject, message) => {
  var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: subject,
    html: "<h1>" + message + "</h1>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, ...user },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "1w",
    }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id, ...user },
    process.env.REFRESH_TOKEN_SECRET_KEY
  );
};

const createFolder = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return console.log("Directory is created.");
  } else {
    return console.log("Directory already exists");
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  passwordHash,
  passwordCompare,
  sendMail,
  createFolder,
};
