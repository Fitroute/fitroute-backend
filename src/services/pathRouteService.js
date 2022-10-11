const PathRoute = require("../models/pathRouteModel");

const insert = (data) => {
  const pathRoute = new Post(data);
  return pathRoute.save();
};

const list = (where) => {
  return PathRoute.find(where).populate({
    //postModel de userı ref ettiğimiz için bu alanları getirebiliriz
    path: "createdBy",
    select: "name surname",
  });
};

const update = (id, data) => {
  return PathRoute.findByIdAndUpdate(id, data, { new: true });
};

const deleteRoute = (id) => {
  return PathRoute.findByIdAndDelete(id);
};

module.exports = { insert, list, update, deleteRoute };
