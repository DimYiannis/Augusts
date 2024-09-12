const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  addToCart,
  getCartItems,
  deleteCartItem,
  updateCartItem,
} = require("../controllers/cartController");

router
.route('/')
.post(authenticateUser, addToCart)
.get(authenticateUser,getCartItems )

router
.route('/:id')
.delete(authenticateUser,  deleteCartItem,)
.patch(authenticateUser,updateCartItem)

module.exports = router;