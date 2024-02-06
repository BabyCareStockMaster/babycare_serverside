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
      Product.belongsToMany(models.Order,{through: models.OrderProduct,foreignKey: 'product_id'})
      Product.belongsToMany(models.Category,{through: models.ProductCategory, foreignKey: 'product_id'})
      Product.belongsToMany(models.Warehouse,{through: models.WarehouseStock, foreignKey: 'product_id'})
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    description: DataTypes.STRING,
    SKU: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};