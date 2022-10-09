//CRUD Operations
const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const validate = require("../middlewares/validate");
const schemas = require("../validations/user");

router.get("/", userController.getAllUsers);
router
  .route("/register")
  .post(validate(schemas.registerValidation), userController.register);
router
  .route("/login")
  .post(validate(schemas.loginValidation), userController.login);
router.get("/bmi/:id", userController.bmi);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
