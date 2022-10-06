//CRUD Operations
const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send("User route");
});

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/bmi/:id", userController.bmi);
router.put("/update/:id", userController.updateUser);

module.exports = router;
