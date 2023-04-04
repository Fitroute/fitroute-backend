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
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
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
    averageScore: {
      type: Number,
      default: 0,
      required: false,
    },
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

module.exports = mongoose.model("pathRoutes", Schema);
