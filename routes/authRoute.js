const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const AdminController = require('../controller/adminController');
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/admin/register', AdminController.register);
router.post('/admin/login', AdminController.login);


module.exports = router;