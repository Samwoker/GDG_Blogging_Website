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
  res.status(status.CREATED).json({ user, token });
});
