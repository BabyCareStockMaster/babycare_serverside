const { Warehouse, WarehouseStock, Product } = require("../models");

class WarehouseStockController {
  static async getStocks(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const warehouse = await Warehouse.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Product,
          }
        ]
      });

      const totalPages = Math.ceil(warehouse.count / limit);

      res.status(200).json({
        totalPages,
        currentPage: page,
        data: warehouse.rows,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateStock(req, res, next) {
    try {
      const { id } = req.params;
      const { product_id, stock } = req.body;

      const warehouse = await Warehouse.findByPk(id);
      const product = await Product.findByPk(product_id);
      if (!warehouse)
        throw { name: "notFound" };
      if(!product)
        throw { name: "notFound"}
      const warehouseStock = await WarehouseStock.findOne({
        where: { warehouse_id: id, product_id: product_id }
      });
      if (warehouseStock) {
        warehouseStock.stock = stock; // Update the stock
        await warehouseStock.save();
        res.status(200).json({
          message: "Successfully updated stock",
          data: warehouseStock
        });
      }
      else {
        const newWarehouseStock = await WarehouseStock.create({
          warehouse_id: id,
          product_id: product_id,
          stock: stock
        });
        res.status(200).json({
          message: "Successfully created stock",
          data: newWarehouseStock
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async transferStock(req, res, next) {
    const { sourceWarehouseId, targetWarehouseId, productId, quantity } = req.body;

    try {
      // Find the source warehouse stock
      const sourceWarehouseStock = await WarehouseStock.findOne({
        where: { warehouse_id: sourceWarehouseId, product_id: productId }
      });

      if (!sourceWarehouseStock || sourceWarehouseStock.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock in source warehouse" });
      }

      // Deduct the stock from the source warehouse
      sourceWarehouseStock.stock -= quantity;
      await sourceWarehouseStock.save();

      // Find or create the target warehouse stock
      const [targetWarehouseStock] = await WarehouseStock.findOrCreate({
        where: { warehouse_id: targetWarehouseId, product_id: productId },
        defaults: { stock: 0 }
      });

      // Add the stock to the target warehouse
      targetWarehouseStock.stock += quantity;
      await targetWarehouseStock.save();

      res.status(200).json({
        message: "Successfully transferred stock",
        sourceWarehouseStock,
        targetWarehouseStock
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req, res, next) {
    const { warehouseId, productId } = req.params;

    try {
      // Find the warehouse stock
      const warehouseStock = await WarehouseStock.findOne({
        where: { warehouse_id: warehouseId, product_id: productId }
      });

      if (!warehouseStock) {
        return res.status(404).json({ message: "Product not found in the warehouse" });
      }

      // Delete the warehouse stock
      await warehouseStock.destroy();

      res.status(200).json({
        message: "Successfully deleted product from the warehouse",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WarehouseStockController;
