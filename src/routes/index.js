const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
// const productRoutes = require('./product.routes');
// const orderRoutes = require('./order.routes');

// Health check (important in production)
router.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API is running' });
});

router.use('/users', userRoutes);
router.use("/product", productRoutes);
// router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);

module.exports = router;