const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function bcryptData(value) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(value, salt);
  return hash;
}

function comparePassword(value, password) {
  let result = bcrypt.compareSync(value, password);
  return result;
}

function jsonwebtoken(payload) {
  let token = jwt.sign(payload, process.env.jwt_secrete);
  return token;
}

function encryptJsonwebtoken(token) {
  let payload = jwt.verify(token, process.env.jwt_secrete);

  return payload;
}

function generateOrderID() {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substr(2, 9);
  return `DONATION-${timestamp}-${randomString}`;
}

module.exports = {
  bcryptData,
  comparePassword,
  jsonwebtoken,
  encryptJsonwebtoken,
  generateOrderID,
};
