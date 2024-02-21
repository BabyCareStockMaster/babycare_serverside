const express = require("express");
const router = express.Router();
const UserRouter = require("./user");
const AdminRouter = require("./admin");
const AuthRouter = require("./auth");
const ProductRouter = require("./product");
const WarehouseRouter = require("./warehouse");
const WarehouseStockRouter = require("./warehousestock");
const CategoryRouter = require("./category");
const OrderRouter = require("./order");
const auth = require("../middleware/auth");

// router.use("/api/uploads", )
router.use("/api/auth", AuthRouter);
router.use(auth);
router.use("/api/users", UserRouter);
router.use("/api/admin", AdminRouter);
router.use("/api/category", CategoryRouter);
router.use("/api/products", ProductRouter);
router.use("/api/warehouses", WarehouseRouter);
router.use("/api/warehousestock", WarehouseStockRouter);
router.use("/api/orders", OrderRouter);

module.exports = router;
