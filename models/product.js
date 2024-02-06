'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Categories, {
        foreignKey: 'categoryId'
      });
      Product.hasMany(models.ProductGallery, {
        foreignKey: 'productId'
      });
      Product.hasMany(models.ProductWarehouse, {
        foreignKey: 'productId'
      });
      Product.hasMany(models.OrderProduct, {
        foreignKey: 'productId'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    sku: DataTypes.STRING,
    price: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};