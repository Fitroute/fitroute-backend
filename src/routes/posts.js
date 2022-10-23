//CRUD Operations
const router = require("express").Router();
const postController = require("../controllers/postController");
const validate = require("../middlewares/validate");
const verifyToken = require("../middlewares/verifyToken");
const schemas = require("../validations/post");

router.route("/").get(postController.getAllPosts);

router
  .route("/create")
  .post(
    verifyToken,
    validate(schemas.createValidation),
    postController.createPost
  );
router
  .route("/upload-images/:id")
  .post(verifyToken, postController.uploadImages);
router
  .route("/update/:id")
  .patch(
    verifyToken,
    validate(schemas.updateValidation),
    postController.updatePost
  );

router.route("/delete/:id").delete(verifyToken, postController.deletePost);
router
  .route("/comment/:id")
  .post(
    verifyToken,
    validate(schemas.commentValidation),
    postController.createComment
  );
router
  .route("/comment/:id/:commentId")
  .delete(verifyToken, postController.deleteComment);

module.exports = router;
