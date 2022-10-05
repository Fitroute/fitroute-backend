//CRUD Operations
const router = require("express").Router();
const userController = require("../controllers/sportAreaController");

router.get("/", (req, res) => {
  res.send("SportArea route");
});

module.exports = router;
