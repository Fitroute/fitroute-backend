//CRUD Operations
const router = require("express").Router();
const sportAreaController = require("../controllers/sportAreaController");

router.get("/", sportAreaController.getAllAreas);
router.get("/:id", sportAreaController.getArea);
router.get("/filter/:category", sportAreaController.getAreasByCategory);
router.post("/create", sportAreaController.createArea);
router.put("/update/:id", sportAreaController.updateArea);
router.delete("/delete/:id", sportAreaController.deleteArea);

module.exports = router;
