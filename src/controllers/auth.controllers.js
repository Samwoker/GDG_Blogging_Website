const catchAsync = require("../utils/catchAsync");
const { status } = require("http-status");
const { userService, tokenService } = require("../services");
const sendMail = require("../utils/sendMail");

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
exports.passwordResetRequest = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await userService.getByEmail(email);
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/resetPassword/${resetToken}`;
  const message = `Forgot your password? Please click this link to reset your password: ${resetUrl}`;
  await sendMail({
    to: email,
    subject: "Password Reset",
    text: message,
  });
  res.status(status.OK).json({
    status: "success",
    message: `Reset link sent to ${email}`,
  });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await userService.findUser(token);
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  user.password = hashedPassword;
  await user.save();
  res.status(status.OK).json({
    status: "success",
    message: "Password reset successfully",
  });
});
