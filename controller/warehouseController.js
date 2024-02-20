const { Warehouse, Product } = require("../models");
const { sendMail } = require("../lib/nodemailer");

class WarehouseController {
  static create = async (req, res, next) => {
    const { name, city, address } = req.body;
    try {
      const data = await Warehouse.create({
        name,
        city,
        address,
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      const { page, pageSize, name, city, address, sort } = req.query;

      // Define pagination
      let paginationClause = {};
      if (page && pageSize) {
        paginationClause = {
          offset: (page - 1) * pageSize,
          limit: parseInt(pageSize),
        };
      }

      // Define filtering criteria
      const whereClause = {};
      if (name) whereClause.name = name;
      if (city) whereClause.city = city;
      if (address) whereClause.address = address;

      // Define sorting
      let orderClause = [];
      if (sort === "latest") orderClause = [["createdAt", "DESC"]];
      if (sort === "oldest") orderClause = [["createdAt", "ASC"]];

      // Retrieve warehouses with optional filtering, pagination, and sorting
      const data = await Warehouse.findAll({
        where: whereClause,
        include: [
          {
            model: Product,
          },
        ],
        ...paginationClause,
        order: orderClause,
      });
      //send alert when product has been 3 month in warehouse
      let emailText = "List Products With 3 Month in Warehouse:\n\n";
      data.forEach((warehouse) => {
        warehouse.Products.forEach((product) => {
          const today = new Date(); // Get the current date and time
          const createdAt = new Date(product.createdAt); // Get the creation date of the warehouse

          // Calculate the date 3 months ago from the current date
          const threeMonthsAgo = new Date(today);
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          const diffTime = Math.abs(today - createdAt);
          // Convert the difference in milliseconds to days
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays >= 90) {
            emailText += `Product Name: ${product.name}, ${warehouse.name}\n`;
          }
        });
      });

      const subject = "Product Alerts";
      sendMail(subject, emailText);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  static getById = async (req, res, next) => {
    try {
      const data = await Warehouse.findByPk(req.params.id, {
        include: [
          {
            model: Product,
          },
        ],
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  static update = async (req, res, next) => {
    const { name, city, address } = req.body;
    try {
      const data = await Warehouse.findByPk(req.params.id);
      const updatedData = await data.update({
        name: name,
        city: city,
        address: address,
      });
      res.status(200).json(updatedData);
    } catch (err) {
      next(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const warehouse = await Warehouse.findByPk(req.params.id);
      await warehouse.destroy();
      res.status(200).json({ message: `${warehouse.name} deleted` });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = WarehouseController;
