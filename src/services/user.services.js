const { resetPassword } = require("../controllers/auth.controllers");
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
exports.login = async (body) => {
  const { password, email } = body;
  const user = await User.findOne({ email });
  if (!(await User.isPasswordMatch(password)) && !user) {
    throw new CustomError(status.NOT_FOUND, "Not Found");
  }
  return user;
};
exports.getById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError(status.NOT_FOUND, "User not found");
  }
  return user;
};
exports.getByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(status.NOT_FOUND, "User not found");
  }
  return user;
};
exports.findUser = async (token) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    throw new CustomError(status.NOT_FOUND, "User not found");
  }
  return user;
};
