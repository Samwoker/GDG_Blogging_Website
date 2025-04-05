const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

const generateToken = async (userId) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
  };
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 60 * 24 * 7,
  });
};
module.exports = generateToken;
