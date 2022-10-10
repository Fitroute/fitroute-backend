const httpStatus = require("http-status");
const { insert, list, update, removePost } = require("../services/postService");

//createdBy - user id
//title
//bodyText
//image - not required

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
    res.status(400).json({
      message: "Post id is required",
    });
  } else {
    await update(req.params.id, req.body)
      .then((post) => {
        res.status(httpStatus.OK).json({
          message: "Post updated successfully",
          post,
        });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Error: " + err);
      });
  }
};

const deletePost = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      message: "Post id is required",
    });
  } else {
    await removePost
      .then((post) => {
        res.status(httpStatus.OK).json({
          message: "Post deleted successfully",
          post,
        });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Error: " + err);
      });
  }
};

module.exports = { createPost, getAllPosts, updatePost, deletePost };
