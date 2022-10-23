const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

const passwordHash = (password) => {
  //Password Hashing
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const passwordCompare = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const sendMail = ({ email, subject, username, message }) => {
  var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "../utils/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../utils/views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: subject,
    template: "email",
    context: {
      name: username,
      code: message,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email sent: " + error);
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

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  passwordHash,
  passwordCompare,
  sendMail,
};
