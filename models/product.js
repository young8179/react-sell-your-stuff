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
      Product.belongsTo(models.User)
      Product.hasMany(models.Comment)
    }
  };
  Product.init({
    title: DataTypes.STRING,
    description: {
      // allowNull: false,
      // defaultValue: null,
      type: DataTypes.TEXT,
    },
    price: {
      // allowNull: false,
      // defaultValue: 0,
      type: DataTypes.DOUBLE,
    },
    complete: {
      // allowNull: false,
      // defaultValue: 0,
      type: DataTypes.BOOLEAN,
    },
    category: {
      // allowNull: false,
      // defaultValue: 0,
      type: DataTypes.STRING,
    },
    imageURL: {
      // allowNull: false,
      // defaultValue: null,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};