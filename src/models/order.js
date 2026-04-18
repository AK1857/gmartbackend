const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number,
      priceAtTime: Number
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["PLACED", "SHIPPED", "DELIVERED"],
    default: "PLACED"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);