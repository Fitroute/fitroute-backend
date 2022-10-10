const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.header("Authorization");
  if (!bearerHeader) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Access denied, No Token Provided" });
    return;
  }
  try {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Token" });
        return;
      }
      req.user = user?._doc;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = verifyToken;
