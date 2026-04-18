const orderService = require("../services/order.service");

exports.placeOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body.id);

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const order = await orderService.getOrderDetails(req.params.id);

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}   

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    
        res.status(200).json({
        success: true,
        data: order
        });
    } catch (err) {
        res.status(400).json({
        success: false,
        message: err.message
        });
    }
    }
    
