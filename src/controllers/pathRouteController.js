const httpStatus = require("http-status");
const {
  insert,
  list,
  update,
  deleteRoute,
  findOne,
} = require("../services/pathRouteService");

const image = require("../services/imageService");
const { createFolder } = require("../utils/helper");

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
  if (!req.params.id) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "PathRoute ID is required",
    });
    return;
  }
  await update(req.params.id, req.body).then((pathRoute) => {
    if (!pathRoute) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "PathRoute not found",
      });
      return;
    }
    res.status(httpStatus.OK).json({
      message: "PathRoute updated successfully",
      pathRoute,
    });
  });
};

// Delete PathRoute
const deletePathRoute = async (req, res) => {
  if (!req.params.id) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "PathRoute ID is required",
    });
    return;
  }
  await deleteRoute(req.params.id).then((pathRoute) => {
    if (!pathRoute) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "PathRoute not found",
      });
      return;
    }
    res.status(httpStatus.OK).json({
      message: "PathRoute deleted successfully",
      pathRoute,
    });
  });
};

// Get All PathRoutes
const getAllPathRoutes = async (req, res) => {
  await list()
    .then((pathRoutes) => {
      res.status(httpStatus.OK).json({
        message: "PathRoutes fetched successfully",
        pathRoutes,
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while fetching pathroutes",
        error: err,
      });
    });
};

// Get PathRoutes by Category
const getPathRoutesByCategory = async (req, res) => {
  await list({ category: { $regex: req.params.category, $options: "i" } })
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

const uploadImages = async (req, res) => {
  if (!req.files.images) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "Upload failed",
      error: "Image is required",
    });
    return;
  }
  const dir = `src/uploads/routes/${req.params.id}`;
  createFolder(dir);
  image.multipleImageUpload(dir, req.files.images).then((images) => {
    update(req.params.id, {
      images: images.map((image) => image.name),
    })
      .then((images) => {
        res.status(httpStatus.OK).json({
          message: "Images uploaded successfully",
        });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message: "Upload failed",
          error: err,
        });
      });
  });
};

const createComment = async (req, res) => {
  findOne({ _id: req.params.id }).then((pathRoute) => {
    if (!pathRoute) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Path Route not found",
      });
      return;
    }
    const comment = {
      ...req.body,
      commented_at: new Date(),
      createdBy: req.user,
    };
    pathRoute.comments.push(comment);
    pathRoute
      .save()
      .then((commentedRoute) => {
        res.status(httpStatus.OK).json({
          message: "Comment created successfully",
          commentedRoute,
        });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Error: " + err);
      });
  });
};
const deleteComment = async (req, res) => {
  findOne({ _id: req.params.id }).then((pathRoute) => {
    if (!pathRoute) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Path Route not found",
      });
      return;
    }
    pathRoute.comments = pathRoute.comments.filter(
      (comment) => comment._id != req.params.commentId
    );
    pathRoute.save().then((commentedRoute) => {
      res.status(httpStatus.OK).json({
        message: "Comment deleted successfully",
        commentedRoute,
      });
    });
  });
};

const updateComment = async (req, res) => {
  findOne({ _id: req.params.id }).then((pathRoute) => {
    if (!pathRoute) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Path Route not found",
      });
      return;
    }
    let comment = pathRoute.comments.find(
      (comment) => comment._id == req.params.commentId
    );
    if (!comment) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Comment not found",
      });
      return;
    }
    comment = Object.assign(comment, req.body);
    comment.commented_at = new Date();
    // comment._doc = { ...comment._doc, ...req.body };
    pathRoute.save().then((commentedRoute) => {
      res.status(httpStatus.OK).json({
        message: "Comment updated successfully",
        commentedRoute,
      });
    });
  });
};

module.exports = {
  createPathRoute,
  updatePathRoute,
  deletePathRoute,
  getPathRoute,
  getAllPathRoutes,
  getPathRoutesByCategory,
  uploadImages,
  createComment,
  deleteComment,
  updateComment,
};
