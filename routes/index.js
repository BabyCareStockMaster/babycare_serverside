const express = require("express");
const router = express.Router();
const UserRouter = require("./user");
const AdminRouter = require("./admin");
const CategoryRouter = require("./category");
const AuthRouter = require("./auth");
const auth = require("../middleware/auth");

router.use('/api/auth', AuthRouter);
router.use(auth);
router.use('/api/users', UserRouter);  
router.use('/api/admin', AdminRouter);
router.use('/api/category', CategoryRouter);

module.exports = router;