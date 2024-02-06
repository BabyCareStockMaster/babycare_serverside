'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Warehouse.hasMany(models.WarehouseActivity, {
        foreignKey: 'warehouseId'
      });
      Warehouse.hasMany(models.Order, {
        foreignKey: 'warehouseId'
      });
      Warehouse.hasMany(models.ProductWarehouse, {
        foreignKey: 'warehouseId'
      })
    }
  }
  Warehouse.init({
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Warehouse',
  });
  return Warehouse;
};