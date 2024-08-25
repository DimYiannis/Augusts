const Cart = require("../models/Cart");
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

const addToCart = async (req, res) => {
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
    const existingItem = await Cart.findOne({
      user: req.user.userId,
      product: productId, productType 
    });
    console.log("Existing item:", existingItem);

    if (existingItem) {
      // User has already liked the post, so unlike it
      await existingItem.remove();

      res.status(StatusCodes.OK).json({
        message: "Item removed successfully!",
      });
    } else {
      // User has not liked the post, so create a new like
      const dbProduct = await ProductModel.findById(productId);

      if (!dbProduct) {
        throw new CustomError.NotFoundError(
          `No product found with id: ${productId}`
        );
      }

      const newItem = new Cart({
        user: req.user.userId,
        product: dbProduct._id,
        productType,
      });
      await newItem.save();

      res.status(StatusCodes.CREATED).json({
        message: "Item added successfully!",
        item: newItem,
      });
    }
  } catch (error) {
    //  validation errors or the post not being found
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// All Cart Items
const getCartItems = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }

    // Fetch all items
    const items = await Cart.find({ user: req.user.userId });

    // Populate the details of each product
    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        const ProductModel = productModelMap[item.productType];
        const productDetails = await ProductModel.findById(item.product);

        return {
          _id: item._id,
          user: item.user,
          product: item.product,
          productType: item.productType,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          productDetails: productDetails || null,
        };
      })
    );

    res.status(StatusCodes.OK).json({ items: itemsWithDetails });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Delete item
const deleteCartItem = async (req, res) => {
  const { id: itemId } = req.params;

  try {

    if (!req.user || !req.user.userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }

    // find the item by id
    const item = await Cart.findById(itemId);

    //check if item exists
    if (!item) {
      throw new CustomError.NotFoundError(`No item found with id: ${itemId}`);
    }
    //check user permissions
    checkPermissions(req.user, item.user);

    // remove the item
    await item.remove();

    // success message
    res.status(StatusCodes.OK).json({ message: "Item deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  deleteCartItem,
};
