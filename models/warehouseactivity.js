'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarehouseActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WarehouseActivity.belongsTo(models.Warehouse, {
        foreignKey: 'warehouseId'
      })
    }
  }
  WarehouseActivity.init({
    warehouseId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    actionName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WarehouseActivity',
  });
  return WarehouseActivity;
};