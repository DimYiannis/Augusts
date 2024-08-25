const Post = require("../models/Sweats");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const getAllProducts = async (req, res) => {
  const posts = await Post.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

module.exports = {
  getAllProducts,
};
