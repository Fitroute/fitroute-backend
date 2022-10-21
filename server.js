const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
const path = require("path");

//Import Routes
require("./src/config/db");
const usersRouter = require("./src/routes/users");
const pathRoutesRouter = require("./src/routes/pathRoutes");
const sportAreasRouter = require("./src/routes/sportAreas");
const postsRouter = require("./src/routes/posts");
//Middleware
app.use(express.json());
// Cors policy hatasını çözer
app.use(cors());
// Helmet paketi ile güvenlik önlemleri alınır
app.use(helmet());
// File upload için middleware
app.use(fileUpload());

//Main Route
app.get("/", (req, res) => {
  res.send("Welcome to fitroute-backend 👋!");
});

//Static Files
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

//Users Route
app.use("/users", usersRouter);

//PathRoutes Route
app.use("/pathRoutes", pathRoutesRouter);

//SportAreas Route
app.use("/sportAreas", sportAreasRouter);

//Posts Route
app.use("/posts", postsRouter);

module.exports = app;
