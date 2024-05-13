'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      TransactionDetail.belongsTo(models.TransactionHeader, {
        foreignKey: 'TransactionHeaderId',
      });

      TransactionDetail.belongsTo(models.Item, {
        foreignKey: 'ItemId',
      });
    }
  }
  TransactionDetail.init(
    {
      TransactionHeaderId: DataTypes.INTEGER,
      ItemId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      subTotal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TransactionDetail',
    }
  );
  return TransactionDetail;
};
