const httpStatus = require("http-status");
const {
  insert,
  list,
  update,
  removeFeedback,
} = require("../services/feedbackService");
//createdBy - user id
//text - not required
//routeId
//score
//displayName - not required

// Generate Feedback
const createFeedback = async (req, res) => {
  req.body.createdBy = req.user;
  await insert(req.body)
    .then((feedback) => {
      res.status(httpStatus.CREATED).json({
        message: "Feedback created successfully",
        feedback,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while creating feedback",
        error: err,
      });
    });
};

// Update Feedback
const updateFeedback = async (req, res) => {
  await update(req.params.id, req.body)
    .then((feedback) => {
      res.status(httpStatus.OK).json({
        message: "Feedback updated successfully",
        feedback,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while updating feedback",
        error: err,
      });
    });
};

// Delete Feedback
const deleteFeedback = async (req, res) => {
  await removeFeedback(req.params.id)
    .then((feedback) => {
      res.status(httpStatus.OK).json({
        message: "Feedback deleted successfully",
        feedback,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while deleting feedback",
        error: err,
      });
    });
};

// Get Feedback by ID
const getFeedback = async (req, res) => {
  await list({ _id: req.params.id })
    .then((feedback) => {
      res.status(httpStatus.OK).json({
        message: "Feedback fetched successfully",
        feedback,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while fetching feedback",
        error: err,
      });
    });
};
// Get All Feedback by Route or Area ID
const getAllFeedbacksByRouteOrAreaID = async (req, res) => {
  await list({ routeId: req.params.id })
    .then((feedbacks) => {
      res
        .status(httpStatus.OK)
        .json({ message: "Feedbacks fetched successfully", feedbacks });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while fetching feedbacks",
        error: err,
      });
    });
};

module.exports = {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback,
  getAllFeedbacksByRouteOrAreaID,
};
