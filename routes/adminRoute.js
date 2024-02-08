const express = require('express');
const router = express.Router();
const AdminController = require('../controller/adminController');
const auth = require('../middleware/auth');


router.get('/', AdminController.getAllAdmins)
router.get('/:id', AdminController.getAdmin)


module.exports = router;