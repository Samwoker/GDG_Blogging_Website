const catchAsync = require("../utils/catchAsync");
const { status } = require("http-status");
const { userService, tokenService } = require("../services");

exports.register = catchAsync(async (req, res) => {
  const user = await userService.register(req.body);
  if (!user) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: "User registration failed" });
  }
  const token = await tokenService.generateToken(user._id);
  res.cookie("token", token);
  res.status(status.CREATED).json({ user, token });
});
exports.login = catchAsync(async (req, res) => {
  const user = await userService.login(req.body);
  const token = await tokenService.generateToken(user._id);
  res.cookie("token", token);
  res.status(status.OK).json({ user, token });
});
exports.logout = catchAsync(async (req, res) => {
  const loggedInUser = req.user;
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res
    .status(status.OK)
    .json({ message: `User ${loggedInUser.username} logged out successfully` });
});
