const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bodyText: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("posts", Schema);
