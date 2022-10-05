//CRUD Operations
const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send("User route");
});

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;
