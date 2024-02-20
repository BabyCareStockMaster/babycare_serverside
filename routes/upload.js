const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productController');
const upload = require('../middleware/multer');

router.post('/:id', upload.single('image'), ProductController.uploadImage);

module.exports = router