const httpStatus = require("http-status");
const path = require("path");
const {
  insert,
  list,
  update,
  removePost,
  findOne,
} = require("../services/postService");
// const image = require("../services/imageService");
const { createFolder } = require("../utils/helper");
//createdBy - user id
//title
//bodyText
//image - not required

///This function is canceled because of the image upload problem we use instead of this base64 for image upload
// const uploadImages = async (req, res) => {
//   if (!req.files.images) {
//     res.status(httpStatus.BAD_REQUEST).json({
//       message: "Upload failed",
//       error: "Image is required",
//     });
//     return;
//   }
//   const dir = `src/uploads/posts/${req.params.id}`;
//   createFolder(dir);
//   image.multipleImageUpload(dir, req.files.images).then((images) => {
//     update(req.params.id, {
//       images: images.map((image) => image.name),
//     })
//       .then((images) => {
//         res.status(httpStatus.OK).json({
//           message: "Images uploaded successfully",
//         });
//       })
//       .catch((err) => {
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//           message: "Upload failed",
//           error: err,
//         });
//       });
//   });
// };

// Get Post by ID
const getPost = async (req, res) => {
  await list({ _id: req.params.id })
    .then((post) => {
      res.status(httpStatus.OK).json({
        message: "Post fetched successfully",
        post,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: err.message,
      });
    });
};

const getAllPosts = async (req, res) => {
  await list()
    .then((posts) => {
      res.status(httpStatus.OK).json({
        message: "Posts fetched successfully",
        length: posts.length,
        posts,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Error: " + err);
    });
};

// Get Posts by Title
const getPostByTitle = async (req, res) => {
  await list({
    title: { $regex: req.params.title, $options: "i" },
  })
    .then((post) => {
      res.status(httpStatus.OK).json({
        message: "Posts fetched successfully",
        post,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while fetching posts",
        error: err,
      });
    });
};

const createPost = async (req, res) => {
  req.body.createdBy = req.user;
  await insert(req.body)
    .then((post) => {
      res.status(httpStatus.CREATED).json({
        message: "Post created successfully",
        post,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Error: " + err);
    });
};

const updatePost = async (req, res) => {
  if (!req.params.id) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "Post id is required",
    });
    return;
  }
  await update(req.params.id, req.body)
    .then((post) => {
      if (!post) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "Post not found",
        });
        return;
      }
      res.status(httpStatus.OK).json({
        message: "Post updated successfully",
        post,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Error: " + err);
    });
};

const deletePost = async (req, res) => {
  if (!req.params.id) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "Post id is required",
    });
    return;
  }
  await removePost(req.params.id).then((post) => {
    if (!post) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Post not found",
      });
      return;
    }
    res.status(httpStatus.OK).json({
      message: "Post deleted successfully",
      post,
    });
  });
};

const createComment = async (req, res) => {
  findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Post not found",
      });
      return;
    }
    const comment = {
      ...req.body,
      commented_at: new Date(),
      createdBy: req.user,
    };
    post.comments.push(comment);
    const totalScore = post.comments.reduce((acc, comment) => {
      return acc + comment.score;
    }, 0);
    const averageScore = totalScore / post.comments.length;
    post.averageScore = averageScore.toFixed(2);
    post
      .save()
      .then((commentedPost) => {
        res.status(httpStatus.OK).json({
          message: "Comment created successfully",
          commentedPost,
        });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Error: " + err);
      });
  });
};

const deleteComment = async (req, res) => {
  findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Post not found",
      });
      return;
    }
    post.comments = post.comments.filter(
      (comment) => comment._id != req.params.commentId
    );
    const totalScore = post.comments.reduce((acc, comment) => {
      return acc + comment.score;
    }, 0);
    const averageScore = totalScore / post.comments.length;
    post.averageScore = averageScore.toFixed(2);
    post.save().then((commentedPost) => {
      res.status(httpStatus.OK).json({
        message: "Comment deleted successfully",
        commentedPost,
      });
    });
  });
};

const updateComment = async (req, res) => {
  findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Post not found",
      });
      return;
    }
    let comment = post.comments.find(
      (comment) => comment._id == req.params.commentId
    );
    if (!comment) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Comment not found",
      });
      return;
    }
    comment = Object.assign(comment, req.body);
    comment.commented_at = new Date();
    // comment._doc = { ...comment._doc, ...req.body };
    const totalScore = post.comments.reduce((acc, comment) => {
      return acc + comment.score;
    }, 0);
    const averageScore = totalScore / post.comments.length;
    post.averageScore = averageScore.toFixed(2);
    post.save().then((commentedPost) => {
      res.status(httpStatus.OK).json({
        message: "Comment updated successfully",
        commentedPost,
      });
    });
  });
};

const createLikes = async (req, res) => {
  findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Post not found",
      });
      return;
    }
    const like = { createdBy: req.user };

    post.likes.push(like);
    post.likesCount = post.likes.length;
    post
      .save()
      .then((likedPost) => {
        res.status(httpStatus.OK).json({
          message: "Like created successfully",
          likedPost,
        });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Error: " + err);
      });
  });
};

const deleteLikes = async (req, res) => {
  findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Post not found",
      });
      return;
    }
    post.likes = post.likes.filter((like) => like._id != req.params.likeId);
    post.likesCount = post.likes.length;
    post.save().then((likedPost) => {
      res.status(httpStatus.OK).json({
        message: "Like deleted successfully",
        likedPost,
      });
    });
  });
};

module.exports = {
  // uploadImages,
  createPost,
  getPost,
  getPostByTitle,
  getAllPosts,
  createLikes,
  deleteLikes,
  updatePost,
  deletePost,
  createComment,
  deleteComment,
  updateComment,
};
