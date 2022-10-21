const Area = require("../models/sportAreaModel");

const insert = (data) => {
  const area = new Area(data);
  return area.save();
};

const list = (where) => {
  return Area.find(where).populate({
    //postModel de userı ref ettiğimiz için bu alanları getirebiliriz
    path: "createdBy",
    select: "name surname",
  });
};

const findOne = (where) => {
  return Area.findOne(where);
};

const update = (id, data) => {
  return Area.findByIdAndUpdate(id, data, { new: true });
};

const removeArea = (id) => {
  return Area.findByIdAndDelete(id);
};

module.exports = { insert, list, update, removeArea, findOne };
