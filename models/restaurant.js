'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.hasMany(models.Item, {
        foreignKey: 'RestaurantId',
      });
      Restaurant.hasMany(models.TransactionHeader, {
        foreignKey: 'RestaurantId',
      });
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      description: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      imgUrl: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Restaurant',
    }
  );
  return Restaurant;
};
