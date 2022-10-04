const app = require("express")();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

// //Import Routes
require("./src/config/db");
const usersRouter = require("./src/routes/users");

//Middleware
app.use(bodyParser.json());
// Cors policy hatasını çözer
app.use(cors());

//Main Route
app.get("/", (req, res) => {
  res.send("Welcome to fitroute-backend 👋!");
});

// //Users Route
app.use("/users", usersRouter);

module.exports = app;
