const { Category } = require("../models");

class CategoryController {
  static async getAll(req, res, next) {
    //make pagination with limit and offset
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
      // Make pagination with limit and offset
      const data = await Category.findAll({
        limit: parseInt(limit),
        offset: offset,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        throw { name: "notFound" };
      }
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, description } = req.body;
      const data = await Category.create({ name, description });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const data = await Category.update(
        { name, description },
        { where: { id } }
      );
      res.status(200).json({ message: "Update Successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Category.destroy({ where: { id } });
      res.status(200).json({ message: "Delete Successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
