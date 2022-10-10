const User = require("../models/userModel");

const insert = (data) => {
  const user = new User(data);
  return user.save();
};

const loginUser = (email) => {
  return User.findOne({ email });
};

const list = (where) => {
  return User.find(where);
};

const update = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const removeUser = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = { insert, loginUser, list, update, removeUser };
