const { jsonwebtoken, comparePassword } = require('../helpers');
const { User } = require('../models');

class UserControllers {
  static async postRegister(req, res, next) {
    try {
      let { name, password, email, phoneNumber } = req.body;
      console.log(req.body, 'REQ<<<<<<');
      const data = await User.create({ name, password, email, phoneNumber });
      console.log(data);
      res.status(201).json({
        message: 'Register succes',
        id: data.id,
        email: data.email,
        name: data.name,
      });
    } catch (error) {
      next(error);
      // console.log(error);
    }
  }
  static async postLogin(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw { name: 'Invalid Input' };
      }
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: 'Invalid User' };
      }
      let compare = comparePassword(password, user.password);
      if (!compare) {
        throw { name: 'Invalid User' };
      }
      let token = jsonwebtoken({
        id: user.id,
      });
      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getUserDetail(req, res, next) {
    try {
      const userId = req.user.id;
      let data = await User.findOne({ where: { id: userId } });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserControllers;
