// services/cart.service.js
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (userId, productId, qty) => {
  let cart = await Cart.findOne({ userId });

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{
        productId,
        quantity: qty,
        priceAtTime: product.price
      }],
      totalAmount: product.price * qty
    });
    return cart;
  }

  const index = cart.items.findIndex(
    item => item.productId.toString() === productId
  );

  if (index > -1) {
    cart.items[index].quantity += qty;
  } else {
    cart.items.push({
      productId,
      quantity: qty,
      priceAtTime: product.price
    });
  }

  // 🔥 Recalculate total
  cart.totalAmount = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.priceAtTime,
    0
  );

  return await cart.save();
};

exports.getCartByUserId = async (userId) => {
  return await Cart.findOne({ userId })
}

exports.updateCartItem = async (userId, productId, qty) => {
    let cart = await Cart.findOne({ userId });
  
    if (!cart) throw new Error("Cart not found");
  
    const index = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
  
    // 🔥 CASE 1: Product NOT in cart → ADD it
    if (index === -1) {
      if (qty <= 0) {
        throw new Error("Quantity must be greater than 0");
      }
  
      const product = await Product.findById(productId);
      if (!product) throw new Error("Product not found");
  
      cart.items.push({
        productId,
        quantity: qty,
        priceAtTime: product.price
      });
    }
  
    // 🔥 CASE 2: Product exists → UPDATE / REMOVE
    else {
      if (qty <= 0) {
        // remove item
        cart.items.splice(index, 1);
      } else {
        // update quantity
        cart.items[index].quantity = qty;
      }
    }
  
    // 🔥 Recalculate total
    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.priceAtTime,
      0
    );
  
    return await cart.save();
  };