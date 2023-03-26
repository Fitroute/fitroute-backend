const httpStatus = require("http-status");
const {
  insert,
  list,
  update,
  removeArea,
  findOne,
} = require("../services/sportAreaService");
const image = require("../services/imageService");
const { createFolder } = require("../utils/helper");

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

// Get Areas by Category
const getAreasByCategory = async (req, res) => {
  await list({
    category: { $regex: req.params.category, $options: "i" },
  })
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

const uploadImages = async (req, res) => {
  if (!req.files.images) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "Upload failed",
      error: "Image is required",
    });
    return;
  }
  const dir = `src/uploads/areas/${req.params.id}`;
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
    const totalScore = area.comments.reduce((acc, comment) => {
      return acc + comment.score;
    }, 0);
    const averageScore = totalScore / area.comments.length;
    area.averageScore = averageScore.toFixed(2);
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
    const totalScore = area.comments.reduce((acc, comment) => {
      return acc + comment.score;
    }, 0);
    const averageScore = totalScore / area.comments.length;
    area.averageScore = averageScore.toFixed(2);
    area.save().then((commentedArea) => {
      res.status(httpStatus.OK).json({
        message: "Comment deleted successfully",
        commentedArea,
      });
    });
  });
};

const updateComment = async (req, res) => {
  findOne({ _id: req.params.id }).then((area) => {
    if (!area) {
      res.status(httpStatus.NOT_FOUND).json({
        message: "Area not found",
      });
      return;
    }
    let comment = area.comments.find(
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
    const totalScore = area.comments.reduce((acc, comment) => {
      return acc + comment.score;
    }, 0);
    const averageScore = totalScore / area.comments.length;
    area.averageScore = averageScore.toFixed(2);
    area.save().then((commentedArea) => {
      res.status(httpStatus.OK).json({
        message: "Comment updated successfully",
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
  uploadImages,
  updateArea,
  deleteArea,
  createComment,
  deleteComment,
  updateComment,
};
