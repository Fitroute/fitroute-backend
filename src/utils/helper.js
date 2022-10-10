const jwt = require("jsonwebtoken");

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
};
