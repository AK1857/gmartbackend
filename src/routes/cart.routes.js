const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/add', authMiddleware, cartController.add);
router.get('/getcart', authMiddleware, cartController.getCart);

module.exports = router;