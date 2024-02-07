const express = require('express');
const router = express.Router();
const UserRouter = require('./userRoute');
const AuthRouter = require('./authRoute');
const auth = require('../middleware/auth');

router.use('/api/auth', AuthRouter);
router.use(auth);
router.use('/api/users', UserRouter);   

module.exports = router;