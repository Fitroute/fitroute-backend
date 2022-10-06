//CRUD Operations
const router = require("express").Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/create", feedbackController.createFeedback);
router.put("/update/:id", feedbackController.updateFeedback);
router.delete("/delete/:id", feedbackController.deleteFeedback);
router.get("/:id", feedbackController.getFeedback);
router.get("comments/:id", feedbackController.getAllFeedbacksByRouteOrAreaID);

module.exports = router;
