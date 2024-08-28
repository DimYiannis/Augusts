const Order = require('../models/Orders');

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

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someRandomValue';
  return { client_secret, amount };
};

//MAKE AN ORDER

const createOrder = async (req, res) => {
  
  const cartItems = req.body.items;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided');
  }

  let orderItems = [];
  let total = 0;  

  for (const item of cartItems) {
    const { productId, amount } = item;

    // Loop through the product models to find the product by ID
    let dbProduct = null;
    let ProductModel = null;

    for (const [type, model] of Object.entries(productModelMap)) {
      dbProduct = await model.findOne({ _id: productId });
      if (dbProduct) {
        ProductModel = model;
        break;
      }
    }
      if (!dbProduct) {
        throw new CustomError.NotFoundError(`No product with id: ${productId}`);
      }

    const { name, price, image, _id } = dbProduct;
    
    // Create an order item
    const singleOrderItem = {
      amount,
      name,
      price,
      image,
      product: _id,
    };
    // add item to order
    orderItems.push(singleOrderItem);
    // calculate total
    total += item.amount * price;
  }

  // get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    orderItems,
    total,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

//ADMIN GET ALL ORDERS

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

//GET AN ORDER FROM ID

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

//SHOW USER'S ORDERS

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

//UPDATE

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = 'paid';
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

//DELETE

const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;

  // Find the order by ID
  const order = await Order.findOne({ _id: orderId });
  
  // Check if the order exists
  if (!order) {
    throw new CustomError.NotFoundError(`No order found with id: ${orderId}`);
  }

  // Check if the user has permission to delete this order
  checkPermissions(req.user, order.user);

  // Delete the order
  await order.remove();

  // Respond with a success message
  res.status(StatusCodes.OK).json({ msg: 'Order deleted successfully' });
};


module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  deleteOrder
}