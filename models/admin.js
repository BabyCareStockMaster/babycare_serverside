'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      Admin.hasMany(models.Warehouse,{foreignKey: 'admin_id'})
      Admin.hasMany(models.Product,{foreignKey: 'admin_id'})
      Admin.hasMany(models.Order,{foreignKey: 'admin_id'})
      Admin.hasMany(models.User,{foreignKey: 'admin_id'})
    }
  }
  Admin.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};