const router = require("express").Router();
const searchController = require("../controllers/searchController");
const verifyToken = require("../middlewares/verifyToken");

router.route("/:query").get(searchController.search);
module.exports = router;
