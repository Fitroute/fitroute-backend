const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb://${process.env.BASE_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`,
    {
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
