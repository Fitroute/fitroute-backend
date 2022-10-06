const Post = require("../models/postModel");

//createdBy - user id
//title
//bodyText
//image - not required

const getAllPosts = async (req, res) => {
  try {
    await Post.find()
      .then((posts) => {
        res.status(201).json(posts);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    await Post.find({ createdBy: req.params.id })
      .then((posts) => {
        res.status(201).json(posts);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const request = req.body;
    const post = new Post(request);
    await post
      .save()
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const request = req.body;
    await Post.findByIdAndUpdate(req.params.id, request)
      .then((post) => {
        res.status(201).json({
          message: "Post updated successfully",
          post,
        });
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(201).json({
          message: "Post deleted successfully",
        });
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPost, getAllPosts, updatePost, deletePost };
