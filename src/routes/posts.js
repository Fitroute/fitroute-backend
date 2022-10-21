//CRUD Operations
const router = require("express").Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middlewares/verifyToken");

router.route("/").get(postController.getAllPosts);
router.route("/create").post(verifyToken, postController.createPost);
router.route("/update/:id").patch(verifyToken, postController.updatePost);
router.route("/delete/:id").delete(verifyToken, postController.deletePost);
router.route("/comment/:id").post(verifyToken, postController.createComment);
router
  .route("/comment/:id/:commentId")
  .delete(verifyToken, postController.deleteComment);

module.exports = router;
