const express = require('express');
const router = express.Router();
const ProductRouter = require('./productRoute')

router.use('/api/products', ProductRouter);

module.exports = router;