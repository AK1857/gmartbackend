const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/place", authMiddleware, orderController.placeOrder);
router.get("/details/:id", authMiddleware, orderController.getOrderDetails);
router.post("/updateStatus/:id", authMiddleware, orderController.updateOrderStatus);

module.exports = router;