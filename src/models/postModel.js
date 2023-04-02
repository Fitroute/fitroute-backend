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
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    hasComment: {
      type: Boolean,
      default: true,
      required: false,
    },
    isPublic: {
      type: Boolean,
      default: true,
      required: false,
    },
    averageScore: {
      type: Number,
      default: 0,
      required: false,
    },
    likesCount: {
      type: Number,
      default: 0,
      required: false,
    },
    likes: [
      {
        createdBy: { type: mongoose.Types.ObjectId, ref: "users" },
      },
    ],
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
