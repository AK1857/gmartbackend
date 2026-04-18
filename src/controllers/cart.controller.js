// controllers/cart.controller.js
const cartService = require('../services/cart.service');

exports.add = async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT
    const { productId, quantity } = req.body;

    let cart = await cartService.getCartByUserId(userId);
    if (!cart) {
       cart= await cartService.addToCart(userId, productId, quantity);
    }else{
        cart = await cartService.updateCartItem(userId, productId, quantity);
    }
     

    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT
    const cart = await cartService.getCartByUserId(userId);
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.removeItem= async(req,res)=>{
    try{
        const{ productId }= req.body;
        const userId = req.user.userId; // from JWT
        const cart = await cartService.removeCartItem(userId, productId);
        res.json(cart);

    }catch(err){
        res.status(400).json({ error: err.message });
    }
}

exports.reduceQuantity= async(req,res)=>{
    try{
        const{ productId,quantity }= req.body;
        const userId = req.user.userId; // from JWT
        const cart = await cartService.reduceQuantity(userId, productId,quantity);
        res.json(cart);

    }catch(err){
        res.status(400).json({ error: err.message });
    }
}
