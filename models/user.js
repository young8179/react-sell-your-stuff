'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product)
      User.hasMany(models.Comment)
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      // unique: true 
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};