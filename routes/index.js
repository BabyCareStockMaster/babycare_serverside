const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const UserRouter = require("./user");
const AdminRouter = require("./admin");
const AuthRouter = require("./auth");
const ProductRouter = require("./product");
const orderRouter = require("./order");
const WarehouseRouter = require("./warehouse");
const WarehouseStockRouter = require("./warehousestock");
const CategoryRouter = require("./category");
const UploadRouter = require("./upload");

router.use("/api/uploads", UploadRouter);
router.use("/api/auth", AuthRouter);
router.use(auth);
router.use("/api/users", UserRouter);
router.use("/api/admin", AdminRouter);
router.use('/orders', orderRouter);
router.use("/api/category", CategoryRouter);
router.use("/api/products", ProductRouter);
router.use("/api/warehouses", WarehouseRouter);
router.use("/api/warehousestock", WarehouseStockRouter);

module.exports = router;
