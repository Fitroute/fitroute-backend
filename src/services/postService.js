const Post = require("../models/postModel");
const insert = (data) => {
  const post = new Post(data);
  return post.save();
};

const list = (where) => {
  // populate ile createdBy altında bize dönmesini istediğimiz alanları belirtiyoruz
  return Post.find(where).populate({
    //postModel de userı ref ettiğimiz için bu alanları getirebiliriz
    path: "createdBy",
    select: "name surname",
  });
};

const update = (id, data) => {
  return Post.findByIdAndUpdate(id, data, { new: true });
};

const removePost = (id) => {
  return Post.findByIdAndDelete(id);
};

module.exports = { insert, list, update, removePost };
