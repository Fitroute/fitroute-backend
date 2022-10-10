const httpStatus = require("http-status");
const {
  insert,
  list,
  update,
  removeArea,
} = require("../services/sportAreaService");

//createdBy - user id
//name
//category
//description
//location
//images - not required

const getAllAreas = async (req, res) => {
  await list()
    .then((areas) => {
      res.status(httpStatus.OK).json({
        message: "Areas fetched successfully",
        areas,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while fetching areas",
        error: err,
      });
    });
};

const getAreasByCategory = async (req, res) => {
  await list({ category: req.params.category })
    .then((areas) => {
      res.status(httpStatus.OK).json({
        message: "Areas fetched successfully",
        areas,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while fetching areas",
        error: err,
      });
    });
};

const createArea = async (req, res) => {
  req.body.createdBy = req.user;
  await insert(req.body)
    .then((area) => {
      res.status(httpStatus.CREATED).json({
        message: "Area created successfully",
        area,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while creating area",
        error: err,
      });
    });
};

const updateArea = async (req, res) => {
  await update(req.params.id, req.body)
    .then((area) => {
      res.status(httpStatus.OK).json({
        message: "Area updated successfully",
        area,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while updating area",
        error: err,
      });
    });
};

const deleteArea = async (req, res) => {
  await removeArea(req.params.id)
    .then((area) => {
      res.status(httpStatus.OK).json({
        message: "Area deleted successfully",
        area,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while deleting area",
        error: err,
      });
    });
};

module.exports = {
  createArea,
  getAllAreas,
  getAreasByCategory,
  updateArea,
  deleteArea,
};
