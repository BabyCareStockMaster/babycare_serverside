const express = require('express');
const router = express.Router();
const WarehouseStockController = require('../controller/warehouseStockController');

router.get('/', WarehouseStockController.getStocks);
router.put('/:id', WarehouseStockController.updateStock);
router.post('/transfer', WarehouseStockController.transferStock);
router.delete('/:warehouseId/:productId', WarehouseStockController.deleteProduct);

module.exports = router;