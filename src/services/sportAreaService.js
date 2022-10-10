const Area = require("../models/sportAreaModel");

const insert = (data) => {
  const area = new Area(data);
  return area.save();
};

const list = (where) => {
  return Area.find(where);
};

const update = (id, data) => {
  return Area.findByIdAndUpdate(id, data, { new: true });
};

const removeArea = (id) => {
  return Area.findByIdAndDelete(id);
};

module.exports = { insert, list, update, removeArea };
