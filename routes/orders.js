var express = require('express')
var router = express.Router();
var orderController = require('../controllers/orderController');

// router.get('/orderList/:orderId', orderController.orderListByOrderNo)
router.get('/orderList', orderController.orderList)

module.exports = router