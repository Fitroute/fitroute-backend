const httpStatus = require("http-status");
const areaModel = require("../models/sportAreaModel");
const postModel = require("../models/postModel");
const routeModel = require("../models/pathRouteModel");

const search = async (req, res) => {
  const searchQuery = req.params.query;
  await Promise.all([
    postModel.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    }),
    areaModel.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    }),
    routeModel.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    }),
  ])
    .then((data) => {
      var post = data[0];
      var area = data[1];
      var route = data[2];
      var result = post.concat(area).concat(route);
      res.status(httpStatus.OK).json({
        message: "Search results fetched successfully",
        length: result.length,
        results: {
          post: post,
          area: area,
          route: route,
        },
      });
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error while fetching search results",
        error: err,
      });
    });
};

module.exports = { search };
