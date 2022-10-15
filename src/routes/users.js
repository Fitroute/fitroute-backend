//CRUD Operations
const router = require("express").Router();
const userController = require("../controllers/userController");
const validate = require("../middlewares/validate");
const verifyToken = require("../middlewares/verifyToken");
const schemas = require("../validations/user");

router.route("/").get(userController.getAllUsers);
router.route("/send").post(schemas.sendCodeValidation, userController.sendCode);
router
  .route("/reset")
  .post(schemas.resetValidation, userController.resetPassword);
router
  .route("/register")
  .post(validate(schemas.registerValidation), userController.register);
router
  .route("/login")
  .post(validate(schemas.loginValidation), userController.login);
router.route("/posts").get(verifyToken, userController.getPostList);
router.route("/areas").get(verifyToken, userController.getAreaList);
router
  .route("/pathRoutes")
  .get(verifyToken, userController.getAllPathRoutesByCreatedBy);
router.route("/bmi").get(verifyToken, userController.getBMI);
router
  .route("/update")
  .patch(
    validate(schemas.updateValidation),
    verifyToken,
    userController.updateUser
  );
router.route("/delete").delete(verifyToken, userController.deleteUser);
module.exports = router;
