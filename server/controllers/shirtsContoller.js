const Product = require("../models/Shirts");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const getAllProducts = async (req, res) => {
  const product = await Product.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ product, count: product.length });
};

module.exports = {
  getAllProducts,
};
