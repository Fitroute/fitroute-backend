const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    bodyText: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    comments: [
      {
        comment: String,
        commented_at: Date,
        displayName: Boolean,
        score: Number,
        createdBy: { type: mongoose.Types.ObjectId, ref: "users" },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("posts", Schema);
