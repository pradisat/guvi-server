const { sign } = require("jsonwebtoken");

module.exports = function (obj) {
  return sign(obj, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
