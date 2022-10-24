//CRUD Operations
const router = require("express").Router();
const sportAreaController = require("../controllers/sportAreaController");
const validate = require("../middlewares/validate");
const verifyToken = require("../middlewares/verifyToken");
const schemas = require("../validations/area");

router.route("/").get(sportAreaController.getAllAreas);
router
  .route("/filter/:category")
  .get(verifyToken, sportAreaController.getAreasByCategory);

router.route("/:id").get(verifyToken, sportAreaController.getArea);
router
  .route("/upload-images/:id")
  .post(verifyToken, sportAreaController.uploadImages);
router
  .route("/create")
  .post(
    verifyToken,
    validate(schemas.createValidation),
    sportAreaController.createArea
  );
router
  .route("/update/:id")
  .patch(
    verifyToken,
    validate(schemas.updateValidation),
    sportAreaController.updateArea
  );
router.route("/delete/:id").delete(verifyToken, sportAreaController.deleteArea);
router
  .route("/comment/:id")
  .post(
    verifyToken,
    validate(schemas.commentValidation),
    sportAreaController.createComment
  );
router
  .route("/comment/:id/:commentId")
  .delete(verifyToken, sportAreaController.deleteComment);

module.exports = router;
