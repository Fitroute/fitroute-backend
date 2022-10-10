//CRUD Operations
const router = require("express").Router();
const sportAreaController = require("../controllers/sportAreaController");
const verifyToken = require("../middlewares/verifyToken");

router.route("/").get(sportAreaController.getAllAreas);
router
  .route("/:category")
  .get(verifyToken, sportAreaController.getAreasByCategory);
router.route("/create").post(verifyToken, sportAreaController.createArea);
router.route("/update/:id").patch(verifyToken, sportAreaController.updateArea);
router.route("/delete/:id").delete(verifyToken, sportAreaController.deleteArea);

module.exports = router;
