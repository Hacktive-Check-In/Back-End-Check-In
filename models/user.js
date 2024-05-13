'use strict';
const { Model } = require('sequelize');
const { bcryptData } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.TransactionHeader, {
        foreignKey: 'UserId',
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'name is required' },
          notNull: { msg: 'name is required' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'email is already registered in the database' },
        validate: {
          notEmpty: { msg: 'email is required' },
          notNull: { msg: 'email is required' },
          isEmail: { msg: 'invalid email format' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, options) => {
          // hasing the data
          user.password = bcryptData(user.password);
          // set default role
          if (user.role == null || !user.role) {
            user.role = 'Staff';
          }
        },
      },
    }
  );
  return User;
};
