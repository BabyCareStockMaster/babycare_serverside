const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');


router.get('/', UserController.getAllUsers);
router.get('/profile', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);


module.exports = router;