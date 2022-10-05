//CRUD Operations
const router = require("express").Router();
const userController = require("../controllers/feedbackController");

router.get("/", (req, res) => {
  res.send("Feedback route");
});

module.exports = router;
