'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductWarehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductWarehouse.belongsTo(models.Warehouse, {
        foreignKey: 'warehouseId'
      });
      ProductWarehouse.belongsTo(models.Product, {
        foreignKey: 'productId'
      })
    }
  }
  ProductWarehouse.init({
    productId: DataTypes.INTEGER,
    warehouseId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductWarehouse',
  });
  return ProductWarehouse;
};