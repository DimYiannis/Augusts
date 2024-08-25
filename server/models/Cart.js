const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: 'productType', // dynamic reference based on productType

    },
    productType: {
      type: String,
      required: true,
      enum: ['Sweats', 'Bottoms', 'Shirts','Accessories', 'Shoes', 'Jackets'] // product model names 
    }
  },
  { timestamps: true }
);

//  uniqueness based on user and post
CartSchema.index({ user: 1, product: 1, productType: 1 }, { unique: true });

module.exports = mongoose.model("Cart", CartSchema);
