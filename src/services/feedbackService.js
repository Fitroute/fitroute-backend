const FeedBack = require("../models/feedbackModel");

const insert = (data) => {
  const feedback = new FeedBack(data);
  return feedback.save();
};

const list = (where) => {
  return FeedBack.find(where);
};

const update = (id, data) => {
  return FeedBack.findByIdAndUpdate(id, data, { new: true });
};

const removeFeedback = (id) => {
  return FeedBack.findByIdAndDelete(id);
};

module.exports = { insert, list, update, removeFeedback };
