const app = require("express")();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

//Import Routes
require("./src/config/db");
const usersRouter = require("./src/routes/users");
const pathRoutesRouter = require("./src/routes/pathRoutes");
const sportAreasRouter = require("./src/routes/sportAreas");
const postsRouter = require("./src/routes/posts");
const feedbacksRouter = require("./src/routes/feedbacks");
//Middleware
app.use(bodyParser.json());
// Cors policy hatasını çözer
app.use(cors());

//Main Route
app.get("/", (req, res) => {
  res.send("Welcome to fitroute-backend 👋!");
});

//Users Route
app.use("/users", usersRouter);

//PathRoutes Route
app.use("/pathRoutes", pathRoutesRouter);

//SportAreas Route
app.use("/sportAreas", sportAreasRouter);

//Posts Route
app.use("/posts", postsRouter);

//Feedbacks Route
app.use("/feedbacks", feedbacksRouter);

module.exports = app;
