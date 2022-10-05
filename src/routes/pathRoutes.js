//CRUD Operations
const router = require("express").Router();
const userController = require("../controllers/pathRouteController");

router.get("/", (req, res) => {
  res.send("PathRoute route");
});

module.exports = router;
