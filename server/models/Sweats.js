const mongoose = require("mongoose");

const SweatsSchema = new mongoose.Schema({
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

SweatsSchema.virtual('sweats', {
  ref: 'Sweats',
  localField: '_id',
  foreignField: 'sweat',
  justOne: false,
});

module.exports = mongoose.model("Sweats", SweatsSchema);
