const FeedBack = require("../models/feedbackModel");

//createdBy - user id
//text - not required
//routeId
//score
//displayName - not required

// Generate Feedback
const createFeedback = async (req, res) => {
  const feedback = new FeedBack({ ...req.body });
  try {
    feedback.save().then(() => {
      res.status(200).json({
        message: "Feedback created successfully",
        feedback,
      });
    });
  } catch (error) {
    res.status(401).json({
      message: "Feedback not successful created",
      error: error.message,
    });
  }
};

// Update Feedback
const updateFeedback = async (req, res) => {
  const request = req.body;
  try {
    await FeedBack.findByIdAndUpdate(req.params.id, request).then(
      (feedback) => {
        res.status(200).json({
          message: "Feedback updated successfully",
        });
      }
    );
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// Delete Feedback
const deleteFeedback = async (req, res) => {
  try {
    await FeedBack.findByIdAndDelete(req.params.id).then((feedback) => {
      res.status(200).json({
        message: "Feedback deleted successfully",
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// Get Feedback by ID
const getFeedback = async (req, res) => {
  try {
    await FeedBack.find({ _id: req.params.id }).then((feedback) => {
      res.status(200).json(feedback);
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// Get All Feedback by Route or Area ID
const getAllFeedbacksByRouteOrAreaID = async (req, res) => {
  try {
    await FeedBack.find({ routeId: req.params.id }).then((feedback) => {
      res.status(200).json(feedback);
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback,
  getAllFeedbacksByRouteOrAreaID,
};
