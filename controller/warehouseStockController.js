const { Warehouse, WarehouseStock, Product } = require("../models");
const { sendMail } = require("../lib/nodemailer");
const cron = require("node-cron");
const { Op } = require("sequelize");
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
          },
        ],
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
  static async checkEmptyStock(req, res, next) {
    try {
      const warehouseStocks = await WarehouseStock.findAll({
        where : {
          stock : 0
        }, 
        include : [
          {
            model : Warehouse
          },
          {
            model : Product
          }
        ]
        
      });

      if(warehouseStocks.length > 0){
        //mapping
        const emptyStocks = warehouseStocks.map((stock)=> {
          return {
            warehouse : stock.Warehouse.name,
            product : `${stock.Product.name} - ${stock.Product.SKU}`
          }
          
        })
        console.log(emptyStocks)

        //send email
        let emailText = "List Products With Empty Stock:\n\n";
        emptyStocks.forEach((stock , index) => {
          emailText += `${index + 1}. Product Name: ${stock.product},  ${stock.warehouse}\n`;
        })
        const subject = "Stock Notif"
        sendMail(subject, emailText)
      }else {
        console.log("No empty stock")
      }
    } catch(error){
      next(error)
    }
  }
  static async checkSurplusStock(req, res, next) {
    try {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      let warehouseStocks = await WarehouseStock.findAll({
        where : {
          createdAt: {
            [Op.lt]: threeMonthsAgo
          }
        },  
        include : [
          {
            model : Warehouse
          },
          {
            model : Product
          }
        ]
      })
      if(warehouseStocks.length > 0){
        const surplusStocks = warehouseStocks.map((stock, index)=> {
          return {
            warehouse : stock.Warehouse.name,
            product : `${stock.Product.name} - ${stock.Product.SKU}`
          }  
        })
        //send email
        let emailText = "List Products With Surplus Stock:\n\n";
        surplusStocks.forEach((stock , index) => {
          emailText += `${index + 1}. Product Name: ${stock.product},  ${stock.warehouse}\n`;
        })
        const subject = "Notif Surplus Stock"
        sendMail(subject, emailText)

      }
    } catch(error){
      next(error)
    }
  }
     static async updateStock(req, res, next) {
    try {
      const { id } = req.params;
      const { product_id, stock } = req.body;

      const warehouse = await Warehouse.findByPk(id);
      const product = await Product.findByPk(product_id);
      if (!warehouse) throw { name: "notFound" };
      if (!product) throw { name: "notFound" };
      const warehouseStock = await WarehouseStock.findOne({
        where: { warehouse_id: id, product_id: product_id },
      });
      if (warehouseStock) {
        warehouseStock.stock = stock; // Update the stock
        await warehouseStock.save();
        res.status(200).json({
          message: "Successfully updated stock",
          data: warehouseStock,
        });
      } else {
        const newWarehouseStock = await WarehouseStock.create({
          warehouse_id: id,
          product_id: product_id,
          stock: stock,
        });
        res.status(200).json({
          message: "Successfully created stock",
          data: newWarehouseStock,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async transferStock(req, res, next) {
    const { sourceWarehouseId, targetWarehouseId, productId, quantity } =
      req.body;

    try {
      // Find the source warehouse stock
      const sourceWarehouseStock = await WarehouseStock.findOne({
        where: { warehouse_id: sourceWarehouseId, product_id: productId },
      });

      if (!sourceWarehouseStock || sourceWarehouseStock.stock < quantity) {
        return res
          .status(400)
          .json({ message: "Insufficient stock in source warehouse" });
      }

      // Deduct the stock from the source warehouse
      sourceWarehouseStock.stock -= quantity;
      await sourceWarehouseStock.save();

      // Find or create the target warehouse stock
      const [targetWarehouseStock] = await WarehouseStock.findOrCreate({
        where: { warehouse_id: targetWarehouseId, product_id: productId },
        defaults: { stock: 0 },
      });

      // Add the stock to the target warehouse
      targetWarehouseStock.stock += quantity;
      await targetWarehouseStock.save();

      res.status(200).json({
        message: "Successfully transferred stock",
        sourceWarehouseStock,
        targetWarehouseStock,
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
        where: { warehouse_id: warehouseId, product_id: productId },
      });

      if (!warehouseStock) {
        return res
          .status(404)
          .json({ message: "Product not found in the warehouse" });
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
