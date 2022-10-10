//CRUD Operations
const router = require("express").Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middlewares/verifyToken");

router.route("/").get(postController.getAllPosts);
router.route("/create").post(verifyToken, postController.createPost);
router.route("/update/:id").patch(verifyToken, postController.updatePost);
router.route("/delete/:id").delete(verifyToken, postController.deletePost);

module.exports = router;
