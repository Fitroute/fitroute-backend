const PathRoute = require("../models/pathRouteModel");

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
  const pathRoute = new PathRoute({ ...req.body });

  try {
    pathRoute.save().then(() => {
      res.status(200).json({
        message: "PathRoute created successfully",
        pathRoute,
      });
    });
  } catch (error) {
    res.status(401).json({
      message: "PathRoute not successful created",
      error: error.message,
    });
  }
};

// Update PathRoute
const updatePathRoute = async (req, res) => {
  const request = req.body;

  try {
    await PathRoute.findByIdAndUpdate(req.params.id, request).then(
      (pathRoute) => {
        res.status(200).json({
          message: "PathRoute updated successfully",
        });
      }
    );
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// Delete PathRoute
const deletePathRoute = async (req, res) => {
  try {
    await PathRoute.findByIdAndDelete(req.params.id).then((pathRoute) => {
      res.status(200).json({
        message: "PathRoute deleted successfully",
        pathRoute,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// Get PathRoutes by Category
const getPathRoutesByCategory = async (req, res) => {
  try {
    await PathRoute.find({ category: req.params.category })
      .then((pathRoutes) => {
        res.status(200).json(pathRoutes);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get PathRoute by ID
const getPathRoute = async (req, res) => {
  try {
    await PathRoute.find({ _id: req.params.id }).then((pathRoute) => {
      res.status(200).json(pathRoute);
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// Get All PathRoute by CreatedBy
const getAllPathRoutesByCreatedBy = async (req, res) => {
  try {
    await PathRoute.find({ createdBy: req.params.id }).then((pathRoutes) => {
      res.status(200).json(pathRoutes);
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = {
  createPathRoute,
  updatePathRoute,
  deletePathRoute,
  getPathRoute,
  getPathRoutesByCategory,
  getAllPathRoutesByCreatedBy,
};
