const Like = require("../models/Likes");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const { Jackets, Accessories, Shoes } = require("../models/Apparel");
const Sweats = require("../models/Sweats");
const Shirts = require("../models/Shirts");
const Bottoms = require("../models/Bottoms");

// Map productType to the corresponding model
const productModelMap = {
  Jackets,
  Accessories,
  Shoes,
  Sweats,
  Shirts,
  Bottoms,
};

const createlike = async (req, res) => {
  const { productId, productType } = req.body;

  try {
     // Ensure req.user is defined
     if (!req.user || !req.user.userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }
    
    // Check if the productType is valid
    const ProductModel = productModelMap[productType];
    if (!ProductModel) {
      throw new CustomError.BadRequestError(
        `Invalid product type: ${productType}`
      );
    }

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({
      user: req.user.userId,
      product: productId, productType 
    });
    console.log("Existing Like:", existingLike);

    if (existingLike) {
      // User has already liked the post, so unlike it
      await existingLike.remove();

      res.status(StatusCodes.OK).json({
        message: "Like removed successfully!",
      });
    } else {
      // User has not liked the post, so create a new like
      const dbProduct = await ProductModel.findById(productId);

      if (!dbProduct) {
        throw new CustomError.NotFoundError(
          `No product found with id: ${productId}`
        );
      }

      const newLike = new Like({
        user: req.user.userId,
        product: dbProduct._id,
        productType,
      });
      await newLike.save();

      res.status(StatusCodes.CREATED).json({
        message: "Like created successfully!",
        like: newLike,
      });
    }
  } catch (error) {
    //  validation errors or the post not being found
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// All likes
const getAllLikes = async (req, res) => {
  try {
    // Fetch all likes
    const likes = await Like.find({ user: req.user.userId });

    // Populate the details of each liked product
    const likesWithDetails = await Promise.all(
      likes.map(async (like) => {
        const ProductModel = productModelMap[like.productType];
        const productDetails = await ProductModel.findById(like.product);

        return {
          _id: like._id,
          user: like.user,
          product: like.product,
          productType: like.productType,
          createdAt: like.createdAt,
          updatedAt: like.updatedAt,
          productDetails: productDetails || null,
        };
      })
    );

    res.status(StatusCodes.OK).json({ likes: likesWithDetails });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Delete like
const deleteLike = async (req, res) => {
  const { id: likeId } = req.params;

  try {
    // find the like by id
    const like = await Like.findById(likeId);
    //check if like exists
    if (!like) {
      throw new CustomError.NotFoundError(`No like found with id: ${likeId}`);
    }
    //check user permissions
    checkPermissions(req.user, like.user);

    // remove the like
    await like.remove();

    // success message
    res.status(StatusCodes.OK).json({ message: "Like deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  createlike,
  getAllLikes,
  deleteLike,
};
