//CRUD Operations
const router = require("express").Router();
const userController = require("../controllers/postController");

router.get("/", (req, res) => {
  res.send("Post route");
});

module.exports = router;
