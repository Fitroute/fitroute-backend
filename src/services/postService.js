const Post = require("../models/postModel");
const insert = (data) => {
  const post = new Post(data);
  return post.save();
};

const list = (where) => {
  return Post.find(where);
};

const update = (id, data) => {
  return Post.findByIdAndUpdate(id, data, { new: true });
};

const removePost = (id) => {
  return Post.findByIdAndDelete(id);
};

module.exports = { insert, list, update, removePost };
