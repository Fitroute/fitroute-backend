//CRUD Operations
const router = require("express").Router();
const pathRouteController = require("../controllers/pathRouteController");
const validate = require("../middlewares/validate");
const verifyToken = require("../middlewares/verifyToken");
const schemas = require("../validations/route");

router.route("/").get(pathRouteController.getAllPathRoutes);
router
  .route("/create")
  .post(
    verifyToken,
    validate(schemas.createValidation),
    pathRouteController.createPathRoute
  );
router
  .route("/update/:id")
  .patch(
    verifyToken,
    validate(schemas.updateValidation),
    pathRouteController.updatePathRoute
  );
router
  .route("/delete/:id")
  .delete(verifyToken, pathRouteController.deletePathRoute);
router.route("/:id").get(verifyToken, pathRouteController.getPathRoute);
router
  .route("/filter/:category")
  .get(verifyToken, pathRouteController.getPathRoutesByCategory);
// router
//   .route("/upload-images/:id")
//   .post(verifyToken, pathRouteController.uploadImages);
router
  .route("/comment/:id")
  .post(
    verifyToken,
    validate(schemas.commentValidation),
    pathRouteController.createComment
  );
router
  .route("/comment/:id/:commentId")
  .delete(verifyToken, pathRouteController.deleteComment);
router
  .route("/comment/update/:id/:commentId")
  .patch(verifyToken, pathRouteController.updateComment);
router.route("/like/:id").post(verifyToken, pathRouteController.like);
module.exports = router;
