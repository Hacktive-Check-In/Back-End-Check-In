'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHeader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionHeader.belongsTo(models.User, {
        foreignKey: 'UserId',
      });

      // Define association with Restaurant
      TransactionHeader.belongsTo(models.Restaurant, {
        foreignKey: 'RestaurantId',
      });
      TransactionHeader.hasMany(models.TransactionDetail, {
        foreignKey: 'TransactionHeaderId',
      });
    }
  }
  TransactionHeader.init(
    {
      UserId: DataTypes.INTEGER,
      RestaurantId: DataTypes.INTEGER,
      reservationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'reservation date is required' },
          notNull: { msg: 'reservation date is required' },
        },
      },
      totalPrice: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'TransactionHeader',
    }
  );
  return TransactionHeader;
};
