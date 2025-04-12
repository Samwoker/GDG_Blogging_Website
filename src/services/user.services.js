const User = require("./../models/user");
const CustomError = require("./../utils/customError");
const { status } = require("http-status");
const { RateLimiterMongo } = require("rate-limiter-flexible");
const config = require("./../config/config");
const mongoose = require("mongoose");


exports.register = async (body) => {
  if (await User.isEmailTaken(body.email)) {
    throw new CustomError(status.BAD_REQUEST, "Email already taken");
  }
  const user = await User.create(body);
  return user;
};

exports.login = async (email, password, ipAddr) => {
  const rateLimiterOptions = {
    storeClient: mongoose.connection,
    dbName: "blog_app",
    blockedDuration: 60 * 60 * 24,
  };
  
  const emailIpBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: config.rateLimiter.maxAttemptsByIPUsername,
    duration: 60 * 10,
  });
  const slowerBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: config.rateLimiter.maxAttemptsPerDay,
    duration: 60 * 60 * 24,
  });
  const emailBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: config.rateLimiter.maxAttemptsPerEmail,
    duration: 60 * 60 * 24,
  });

  const promise = [slowerBruteLimiter.consume(ipAddr)];
  const user = await User.findOne({ email });
  if ( !user || !(await user.isPasswordMatch(password)) ) {
   user && promise.push(
      [`${emailIpBruteLimiter.consume(`${email}_${ipAddr}`)}`],
      emailBruteLimiter.consume(email)
    );
    await Promise.all(promise);
    throw new CustomError(status.NOT_FOUND, "Not Found");
  }
  return user;
};
exports.getById = async (id) => {
  const user = await User.findById({ _id: id });
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
exports.findOrCreateGoogleUser = async (profile) => {
  const email = profile.emails[0].value;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name: profile.displayName,
      email: email,
      googleId: profile.id,
    });
  }
  return user;
};
