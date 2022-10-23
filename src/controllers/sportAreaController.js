const httpStatus = require("http-status");
const {
  insert,
  list,
  update,
  removeArea,
  findOne,
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

// Get area by ID
const getArea = async (req, res) => {
  await list({ _id: req.params.id })
    .then((area) => {
      res.status(httpStatus.OK).json({
        message: "Area fetched successfully",
        area,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: err.message,
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
  if (!req.params.id) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "Area id is required",
    });
    return;
  }
  await update(req.params.id, req.body).then((area) => {
    if (!area) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Area not found",
      });
      return;
    }
    res.status(httpStatus.OK).json({
      message: "Area updated successfully",
      area,
    });
  });
};

const deleteArea = async (req, res) => {
  if (!req.params.id) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "Area id is required",
    });
    return;
  }
  await removeArea(req.params.id).then((area) => {
    if (!area) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Area not found",
      });
      return;
    }
    res.status(httpStatus.OK).json({
      message: "Area deleted successfully",
      area,
    });
  });
};

const createComment = async (req, res) => {
  findOne({ _id: req.params.id }).then((area) => {
    if (!area) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Area not found",
      });
      return;
    }
    const comment = {
      ...req.body,
      commented_at: new Date(),
      createdBy: req.user,
    };
    area.comments.push(comment);
    area
      .save()
      .then((commentedArea) => {
        res.status(httpStatus.OK).json({
          message: "Comment created successfully",
          commentedArea,
        });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Error: " + err);
      });
  });
};

const deleteComment = async (req, res) => {
  findOne({ _id: req.params.id }).then((area) => {
    if (!area) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Area not found",
      });
      return;
    }
    area.comments = area.comments.filter(
      (comment) => comment._id != req.params.commentId
    );
    area.save().then((commentedArea) => {
      res.status(httpStatus.OK).json({
        message: "Comment deleted successfully",
        commentedArea,
      });
    });
  });
};

module.exports = {
  createArea,
  getAllAreas,
  getAreasByCategory,
  getArea,
  updateArea,
  deleteArea,
  createComment,
  deleteComment,
};
