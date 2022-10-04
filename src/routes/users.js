//CRUD Operations
const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send("User route");
});

module.exports = router;
