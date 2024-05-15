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
          notEmpty: { msg: 'password is required' },
          notNull: { msg: 'password is required' },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'phone number is required' },
          notNull: { msg: 'phone number is required' },
        },
      },
      avatar: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, options) => {
          // hasing the data
          user.password = bcryptData(user.password);

          user.avatar =
            'https://res.cloudinary.com/dghilbqdk/image/upload/v1714440067/profile%20pic/blggo1bqrandlpfurdp5.jpg';
        },
      },
    }
  );
  return User;
};
