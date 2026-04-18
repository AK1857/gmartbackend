const Cart = require("../models/cart");
const Order = require("../models/order");

exports.createOrder = async (userId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // 🔥 Create order from cart snapshot
  const order = await Order.create({
    userId,
    items: cart.items,
    totalAmount: cart.totalAmount
  });

  // 🔥 Clear cart after order
  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();
  return order;
};

exports.updateOrderStatus = async (orderId, status) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    
    order.status = status;
    return await order.save();
    }

exports.getOrderDetails = async (orderId) => {
  return await Order.find({ _id: orderId });
}