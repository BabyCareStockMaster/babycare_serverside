const { Op } = require("sequelize");
const { Product, Category, ProductCategory } = require("../models");

class ProductController {
  static async createProduct(req, res, next) {
    try {
      const { name, price, brand, description, SKU, categories, image } = req.body;

      // Create the product
      const product = await Product.create({
        name,
        price,
        brand,
        description,
        SKU,
        image
      });

      // Assign categories to the product
      if (categories && categories.length > 0) {
        for (let i = 0; i < categories.length; i++) {
          const category = await Category.findOne({
            where: { id: categories[i] },
          });
          console.log(category.id)
          console.log(product.id)
          if (category) {
            await ProductCategory.create({
              product_id: product.id,
              category_id: category.id,
            });
          }
        }
      }

      res.status(201).json({
        message: "Successfully created product",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllProducts(req, res, next) {
    try {
      const { categoryName, SKU, name, id, sort, page, limit } = req.query;

      // Define the where clause for the query
      let whereClause = {};
      if (SKU) whereClause.SKU = SKU;
      if (name) whereClause.name = { [Op.iLike]: `%${name}%` };
      if (id) whereClause.id = id;

      // Define the order clause for the query
      let orderClause = [];
      if (sort === "latest") orderClause = [["createdAt", "DESC"]];
      if (sort === "oldest") orderClause = [["createdAt", "ASC"]];
      if (sort === "price") orderClause = [["price", "ASC"]];
      if (sort === "price") orderClause = [["price", "DESC"]];

      // Define the pagination clause for the query
      let paginationClause = {};
      if (page && limit) {
        paginationClause = {
          offset: (page - 1) * limit,
          limit: parseInt(limit),
        };
      }

      // If a category is specified, find the category and get its associated products
      if (categoryName) {
        const category = await Category.findOne({
          where: { name: { [Op.iLike]: `%${categoryName}%` } },
        });
        if (!category)
          throw { name: "notFound" };
        const products = await category.getProducts({
          where: whereClause,
          order: orderClause,
          ...paginationClause,
        });
        return res.status(200).json({
          message: "Successfully get Products",
          data: products,
        });
      }

      // If no category is specified, get all products that match the where clause
      const products = await Product.findAll({
        where: whereClause,
        order: orderClause,
        ...paginationClause,
      });
      return res.status(200).json({
        message: "Successfully get Products",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getDetailProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (product) {
        res.status(200).json({
          message: "Succesfully get Product",
          data: product,
        });
      } else {
        throw { name: "notFound" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, brand, description, SKU, categories, image } = req.body;

      // Update the product
      await Product.update(
        {
          name,
          price,
          brand,
          description,
          SKU,
          image
        },
        {
          where: { id },
        }
      );

      // Update product's categories
      if (categories && categories.length > 0) {
        // Remove old categories
        await ProductCategory.destroy({ where: { product_id: id } });

        // Add new categories
        for (let i = 0; i < categories.length; i++) {
          const category = await Category.findOne({
            where: { id: categories[i] },
          });
          if (category) {
            await ProductCategory.create({
              product_id: id,
              category_id: category.id,
            });
          }
        }
      }

      res.status(200).json({
        message: "Successfully updated product",
        data: req.body,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      await Product.destroy({ where: { id } });
      res.status(201).json({
        message: "Succesfully Deleted Product",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
