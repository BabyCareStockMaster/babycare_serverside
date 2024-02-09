const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productController');
const upload = require('../middleware/multer');

router.post('/', upload, ProductController.createProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getDetailProduct)
router.put('/:id', upload, ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router;