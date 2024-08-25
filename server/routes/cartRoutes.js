const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  addToCart,
  getCartItems,
  deleteCartItem,
} = require("../controllers/cartController");

router
.route('/')
.post(authenticateUser, addToCart)
.get(authenticateUser,getCartItems )

router
.route('/:id')
.delete(authenticateUser,  deleteCartItem)

module.exports = router;