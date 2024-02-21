const express = require('express');
const router = express.Router();
const  OrderController  = require('../controller/orderController');

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getallOrders);
router.put('/:id', OrderController.updateStatus);
router.delete('/:id', OrderController.deleteOrder);
module.exports = router;