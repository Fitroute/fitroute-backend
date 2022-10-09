const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.header("Authorization");
  if (!bearerHeader) {
    res.status(401).json({ message: "Access denied, No Token Provided" });
    return;
  }
  try {
    jwt.verify(bearerHeader, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
        return;
      }
      req.uid = decoded._id;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = verifyToken;
