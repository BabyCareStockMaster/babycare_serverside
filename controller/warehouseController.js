const { Warehouse, Product } = require('../models');


class WarehouseController {

  static create = async (req, res, next) => {
    const { name, city, address } = req.body;
    try {
      const data = await Warehouse.create({
        name,
        city,
        address
      });
      res.status(200).json(data);
      
    } catch (err) {
      next(err);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      const data = await Warehouse.findAll({
        include: [
          {
            model: Product
          }
        ]
      });
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
            model: Product
          }
        ]
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
        address: address
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
      res.status(200).json(
        {message: `${warehouse.name} deleted`}
      );
      
    } catch (err) {
      next(err);
    }
  };
}

module.exports = WarehouseController;
