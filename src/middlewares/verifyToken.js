const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.header("Authorization");
  if (!bearerHeader) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Access denied, No Token Provided" });
    return;
  }
  try {
    const token = bearerHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const dbUser = await userService.checkUserByID(decodedToken._id);
    if (!dbUser) {
      res.status(httpStatus.UNAUTHORIZED).json({ message: "User not found" });
      return;
    }
    req.user = dbUser;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = verifyToken;
