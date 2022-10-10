const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("sportAreas", Schema);
