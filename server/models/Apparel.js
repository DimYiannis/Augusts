const mongoose = require("mongoose");

const JacketsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    default: '/uploads/example.jpeg',
    trim: true,
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL', null], 
  },
});

const AccessoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ShoesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, 
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
      trim: true,
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL", null],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Jackets: mongoose.model("Jackets", JacketsSchema),
  Accessories: mongoose.model("Accessories", AccessoriesSchema),
  Shoes: mongoose.model("Shoes", ShoesSchema),
};