const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    score: {
      type: Number,
      required: false,
    },
    displayName: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("feedbacks", Schema);
