const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}${process.env.MONGO_URI}`,
    {
      dbName: process.env.MONGO_DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error while connecting to database " + err);
  });
