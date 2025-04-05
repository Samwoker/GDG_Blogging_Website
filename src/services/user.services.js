const User = require("./../models/user.model");
const CustomError = require("./../utils/customError");
const { status } = require("http-status");

exports.register = async (body) => {
  if (await User.isEmailTaken(body.email)) {
    throw new CustomError(status.BAD_REQUEST, "Email already taken");
  }
  const user = await User.create(body);
  return user;
};
