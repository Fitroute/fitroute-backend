const httpStatus = require("http-status");
const {
  insert,
  list,
  update,
  deleteRoute,
} = require("../services/pathRouteService");

//name
//description - not required
//start
//end - not required
//length - not required
//pin
//createdBy - user id
//isPrivate
//category
//images - not required

// Generate PathRoute
const createPathRoute = async (req, res) => {
  req.body.createdBy = req.user;
  await insert(req.body)
    .then((pathRoute) => {
      res.status(httpStatus.CREATED).json({
        message: "PathRoute created successfully",
        pathRoute,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: err.message,
      });
    });
};

// Update PathRoute
const updatePathRoute = async (req, res) => {
  await update(req.params.id, req.body)
    .then((pathRoute) => {
      res.status(httpStatus.OK).json({
        message: "PathRoute updated successfully",
        pathRoute,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: err.message,
      });
    });
};

// Delete PathRoute
const deletePathRoute = async (req, res) => {
  await deleteRoute(req.params.id)
    .then((pathRoute) => {
      res.status(httpStatus.OK).json({
        message: "PathRoute deleted successfully",
        pathRoute,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: err.message,
      });
    });
};

// Get PathRoutes by Category
const getPathRoutesByCategory = async (req, res) => {
  await list({ category: req.params.category })
    .then((pathRoutes) => {
      res.status(httpStatus.OK).json({
        message: "Routes fetched successfully",
        pathRoutes,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: err.message,
      });
    });
};

// Get PathRoute by ID
const getPathRoute = async (req, res) => {
  await list({ _id: req.params.id })
    .then((pathRoute) => {
      res.status(httpStatus.OK).json({
        message: "Route fetched successfully",
        pathRoute,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: err.message,
      });
    });
};

module.exports = {
  createPathRoute,
  updatePathRoute,
  deletePathRoute,
  getPathRoute,
  getPathRoutesByCategory,
};
