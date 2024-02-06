'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Order.belongsTo(models.Warehouse, {
        foreignKey: 'warehouseId'
      });
      Order.hasMany(models.OrderProduct, {
        foreignKey: 'orderId'
      })
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    warehouseId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    trackingCode: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    address: DataTypes.STRING,
    totalItem: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};