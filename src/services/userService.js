const User = require("../models/userModel");

const insert = (data) => {
  const user = new User(data);
  return user.save();
};

const checkUser = (data) => {
  return User.findOne(data);
};

const checkUserByID = (where) => {
  return User.findById(where);
};

const list = (where) => {
  return User.find(where);
};

const updateWithEmail = (where, data) => {
  return User.findOneAndUpdate(where, data, { new: true });
};

const removeFromDB = (email, data) => {
  return User.findOneAndUpdate({ email }, { $unset: data }, { new: true });
};

const update = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const removeUser = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  insert,
  checkUser,
  list,
  checkUserByID,
  updateWithEmail,
  update,
  removeUser,
  removeFromDB,
};
