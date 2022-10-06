const Area = require("../models/sportAreaModel");

//createdBy - user id
//name
//category
//description
//location
//images - not required

const getAllAreas = async (req, res) => {
  try {
    await Area.find()
      .then((areas) => {
        res.status(200).json(areas);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAreasByCategory = async (req, res) => {
  try {
    await Area.find({ category: req.params.category })
      .then((areas) => {
        res.status(200).json(areas);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArea = async (req, res) => {
  try {
    await Area.find({ createdBy: req.params.id })
      .then((areas) => {
        res.status(200).json(areas);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArea = async (req, res) => {
  try {
    const request = req.body;
    const area = new Area(request);
    await area
      .save()
      .then((area) => {
        res.status(201).json(area);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateArea = async (req, res) => {
  try {
    const request = req.body;
    await Area.findByIdAndUpdate(req.params.id, request)
      .then((area) => {
        res.status(200).json(area);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteArea = async (req, res) => {
  try {
    await Area.findByIdAndDelete(req.params.id)
      .then((area) => {
        res.status(200).json(area);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createArea,
  getAllAreas,
  getAreasByCategory,
  getArea,
  updateArea,
  deleteArea,
};
