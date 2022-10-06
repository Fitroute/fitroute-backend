//CRUD Operations
const router = require("express").Router();
const pathRouteController = require("../controllers/pathRouteController");

router.post("/create", pathRouteController.createPathRoute);
router.put("/update/:id", pathRouteController.updatePathRoute);
router.delete("/delete/:id", pathRouteController.deletePathRoute);
router.get("/:id", pathRouteController.getPathRoute);
router.get("/filter/:category", pathRouteController.getPathRoutesByCategory);
router.get("/routes/:id", pathRouteController.getAllPathRoutesByCreatedBy);

module.exports = router;
