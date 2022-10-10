const PathRoute = require("../models/pathRouteModel");

const insert = (data) => {
  const pathRoute = new Post(data);
  return pathRoute.save();
};

const list = (where) => {
  return PathRoute.find(where);
};

const update = (id, data) => {
  return PathRoute.findByIdAndUpdate(id, data, { new: true });
};

const deleteRoute = (id) => {
  return PathRoute.findByIdAndDelete(id);
};

module.exports = { insert, list, update, deleteRoute };
