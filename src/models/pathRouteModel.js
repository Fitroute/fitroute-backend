const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: false,
    },
    length: {
      type: Number,
      required: false,
    },
    pin: {
      type: Array,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
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
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("pathRoutes", Schema);
