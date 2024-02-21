const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productController');

router.post('/', ProductController.createProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getDetailProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router;