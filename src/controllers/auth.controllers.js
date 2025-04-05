const catchAsync = require("../utils/catchAsync");
const { status } = require("http-status");
const { userService } = require("../services");

exports.register = catchAsync(async (req, res) => {
  const user = await userService.register(req.body);
  res.status(status.CREATED).json({ user });
});
