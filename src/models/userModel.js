const mongoose = require("mongoose");
const logger = require("../loggers/user");
const Schema = mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    image: {
      type: Buffer,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);
//Logger için mongoose hooks kullanıldı.
// Schema.pre("save", (next, doc) => {
//   console.log("Önceki durum: ", doc);
//   next();
// });

Schema.post("save", (doc) => {
  logger.log({ level: "info", message: doc });
});

module.exports = mongoose.model("users", Schema);
