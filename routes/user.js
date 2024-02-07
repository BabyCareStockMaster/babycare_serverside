const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);


module.exports = router;