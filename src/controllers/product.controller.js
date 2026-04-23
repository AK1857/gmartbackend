// controllers/user.controller.js
const userService = require('../services/user.service');
const productService = require('../services/product.service');

exports.create = async (req, res, next) => {
    try {
        const product = await productService.creatProduct(req.body);
        res.status(201).json({ success: true, product: product });
    } catch (err) {
        next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'product not found' });
        }
        res.json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
}

exports.updateProduct = async (req, res, next) => {
    // Implement update logic
    try {
        // Placeholder for update logic
        let product = await productService.updateProduct(req.body);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: 'product updated', data: product });
    }
    catch (err) {
        next(err);
    }
}

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
}