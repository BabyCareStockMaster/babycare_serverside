const { WarehouseStock } = require("../models");

class WarehouseStockController {
  static async getStocks(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const warehouseStocks = await WarehouseStock.findAndCountAll({
        limit,
        offset,
      });

      const totalPages = Math.ceil(warehouseStocks.count / limit);

      res.status(200).json({
        totalPages,
        currentPage: page,
        data: warehouseStocks.rows,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateStock(req, res, next) {
    try {
      const { id } = req.params;
      const { stock } = req.body;
      const warehouseStock = await WarehouseStock.findByPk(id);
      if (!warehouseStock) {
        return res.status(404).json({
          message: "Product Not Found",
        });
      }
      warehouseStock.stock = stock; // Update the stock
      await warehouseStock.save();
      res.status(200).json({
        message: "Successfully updated stock",
        data: warehouseStock
      });
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
