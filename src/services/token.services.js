const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const config = require("./../config/config");

exports.generateToken = async (userId) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
  };
  return await jwt.sign(payload, config.jwtSecret, {
    expiresIn: 60 * 60 * 60 * 24 * 7,
  });
};

