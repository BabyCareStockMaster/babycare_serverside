'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product,{through: models.OrderProduct,foreignKey: 'order_id'})
      Order.hasMany(models.OrderProduct,{foreignKey: 'order_id'})
      Order.belongsTo(models.User,{foreignKey: 'user_id'})
      Order.belongsTo(models.Warehouse,{foreignKey: 'warehouse_id'})
    }
  } 
  Order.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    status: {
      type: DataTypes.ENUM('online', 'offline', 'b2b'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },  
    total_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    total_price: {
      type: DataTypes.FLOAT
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    tracking_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};