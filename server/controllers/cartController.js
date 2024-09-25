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
  const { productId, productType, size } = req.body;
  
  try {
    console.log("Received payload:", req.body); // Add this line for debugging

    // Ensure req.user is defined
    if (!req.user || !req.user.userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }
    
    // Check if all required fields are present
    if (!productId || !productType) {
      throw new CustomError.BadRequestError("productId and productType are required");
    }

    // Check if the productType is valid
    const ProductModel = productModelMap[productType];
    if (!ProductModel) {
      throw new CustomError.BadRequestError(`Invalid product type: ${productType}`);
    }

    // Check if the product exists
    const dbProduct = await ProductModel.findById(productId);
    if (!dbProduct) {
      throw new CustomError.NotFoundError(`No product found with id: ${productId}`);
    }

    // Check if the user has already added the item with the same size
    const cartQuery = {
      user: req.user.userId,
      product: productId, 
      productType,
    };

    // Only include size in the query if it's not an accessory
    if (productType !== 'Accessories' && size) {
      cartQuery.size = size;
    }

    const existingItem = await Cart.findOne(cartQuery);

    if (existingItem) {
      // Increment quantity if item already exists
      existingItem.quantity += 1;
      await existingItem.save();

      res.status(StatusCodes.OK).json({
        message: "Item quantity updated successfully!",
        item: existingItem,
      });
    } else {
      // Create a new cart item
      const newItem = new Cart({
        user: req.user.userId,
        product: dbProduct._id,
        productType,
        ...(productType !== 'Accessories' && { size }),
        quantity: 1,
      });
      await newItem.save();

      res.status(StatusCodes.CREATED).json({
        message: "Item added successfully!",
        item: newItem,
      });
    }
  } catch (error) {
    console.error("Error in addToCart:", error);
    if (error instanceof CustomError.BadRequestError || error instanceof CustomError.NotFoundError) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An unexpected error occurred" });
    }
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

        if (!productDetails) {
          console.error(`Product not found for item: ${item._id}`);
          return null;
        }

        return {
          _id: item._id,
          user: item.user,
          product: item.product,
          productType: item.productType,
          size: item.size,
          quantity: item.quantity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          productDetails: {
            name: productDetails.name,
            price: productDetails.price,
            image: productDetails.image,
          },
        };
      })
    );

    // Filter out any null items (where product details weren't found)
    const validItems = itemsWithDetails.filter(item => item !== null);

    res.status(StatusCodes.OK).json({ items: validItems });
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

// update 
const updateCartItem = async (req, res) => {
  const { id: itemId } = req.params;
  const { quantity } = req.body;

  try {
    if (!req.user || !req.user.userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }

    // Validate that the quantity is a positive integer
    if (quantity <= 0) {
      throw new CustomError.BadRequestError("Quantity must be greater than zero");
    }

     // Log the incoming request data for debugging
     console.log(`Updating cart item with ID: ${itemId}`);
     console.log(`Requested quantity: ${quantity}`); 

    // Find the cart item by ID
    const item = await Cart.findById(itemId);

    if (!item) {
      throw new CustomError.NotFoundError(`No item found with id: ${itemId}`);
    }

    // Check user permissions
    checkPermissions(req.user, item.user);

    // Update the quantity
    item.quantity = quantity;
    await item.save();

    res.status(StatusCodes.OK).json({
      message: "Item quantity updated successfully!",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};


module.exports = {
  addToCart,
  getCartItems,
  deleteCartItem,
  updateCartItem,
};
