const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const ProductRouter = require('./productRoute')

router.use('/api/products', ProductRouter);
=======
const UserRouter = require('./userRoute');
const AdminRouter = require('./adminRoute');
const AuthRouter = require('./authRoute');
const auth = require('../middleware/auth');

router.use('/api/auth', AuthRouter);
router.use(auth);
router.use('/api/users', UserRouter);  
router.use('/api/admin', AdminRouter);
>>>>>>> development

module.exports = router;