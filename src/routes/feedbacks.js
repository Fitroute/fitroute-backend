//CRUD Operations
const router = require("express").Router();
const feedbackController = require("../controllers/feedbackController");
const verifyToken = require("../middlewares/verifyToken");

router.route("/create").post(verifyToken, feedbackController.createFeedback);
router
  .route("/update/:id")
  .patch(verifyToken, feedbackController.updateFeedback);
router
  .route("/delete/:id")
  .delete(verifyToken, feedbackController.deleteFeedback);
router.route("/:id").get(verifyToken, feedbackController.getFeedback);
router
  .route("/comments/:id")
  .get(verifyToken, feedbackController.getAllFeedbacksByRouteOrAreaID);

module.exports = router;
