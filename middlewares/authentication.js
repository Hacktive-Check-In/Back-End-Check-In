const { encryptJsonwebtoken } = require('../helpers');
const { User } = require('../models');

let Authentication = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) {
      throw { name: 'invalidToken' };
    } else {
      let [bearer, token] = access_token.split(' ');
      if (bearer != 'Bearer') {
        throw { name: 'invalidToken' };
      }

      let payload = encryptJsonwebtoken(token);
      let user = await User.findByPk(payload.id);
      // if (!user) {
      //   throw { name: 'invalidToken' };
      // }

      req.user = {
        id: user.id,
      };
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = Authentication;
