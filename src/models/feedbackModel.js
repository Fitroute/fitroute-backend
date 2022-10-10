const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    text: {
      type: String,
      required: false,
    },
    routeId: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    displayName: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("feedbacks", Schema);
