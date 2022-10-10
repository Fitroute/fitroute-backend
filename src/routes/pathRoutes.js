//CRUD Operations
const router = require("express").Router();
const pathRouteController = require("../controllers/pathRouteController");
const verifyToken = require("../middlewares/verifyToken");

router.route("/create").post(verifyToken, pathRouteController.createPathRoute);
router
  .route("/update/:id")
  .patch(verifyToken, pathRouteController.updatePathRoute);
router
  .route("/delete/:id")
  .delete(verifyToken, pathRouteController.deletePathRoute);
router.route("/:id").get(verifyToken, pathRouteController.getPathRoute);
router
  .route("/filter/:category")
  .get(verifyToken, pathRouteController.getPathRoutesByCategory);

module.exports = router;
