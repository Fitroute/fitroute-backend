//CRUD Operations
const router = require("express").Router();
const userController = require("../controllers/userController");
const validate = require("../middlewares/validate");
const verifyToken = require("../middlewares/verifyToken");
const schemas = require("../validations/user");

router.route("/").get(userController.getAllUsers);
router.route("/profile-image").post(verifyToken, userController.uploadImage);
router
  .route("/send")
  .post(validate(schemas.sendCodeValidation), userController.sendCode);
router
  .route("/reset")
  .post(validate(schemas.resetValidation), userController.resetPassword);
router
  .route("/change")
  .post(
    verifyToken,
    validate(schemas.changePasswordValidation),
    userController.changePassword
  );

router
  .route("/register")
  .post(validate(schemas.registerValidation), userController.register);
router.route("/verify/:id/:token").get(userController.verifyEmail);
router
  .route("/login")
  .post(validate(schemas.loginValidation), userController.login);
router.route("/posts").get(verifyToken, userController.getPostList);
router.route("/areas").get(verifyToken, userController.getAreaList);
router.route("/fetch").get(verifyToken, userController.getUser);

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
