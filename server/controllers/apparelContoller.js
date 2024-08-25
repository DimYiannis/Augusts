const { Jackets, Accessories, Shoes } = require("../models/Apparel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const getAllProducts = async (req, res) => {
  try {
    // Fetch data from each collection
    const jackets = await Jackets.find({});
    const accessories = await Accessories.find({});
    const shoes = await Shoes.find({});

    // Combine the results
    const allProducts = {
      jackets,
      accessories,
      shoes
    };

    // Send the combined data as a response
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
};
