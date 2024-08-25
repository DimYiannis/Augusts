const mongoose = require("mongoose");

const BottomsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Price should not be negative
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
}, {
  timestamps: true, 
});

BottomsSchema.virtual('bottoms', {
  ref: 'Bottoms',
  localField: '_id',
  foreignField: 'bottom',
  justOne: false,
});

module.exports = mongoose.model("Bottoms", BottomsSchema);
