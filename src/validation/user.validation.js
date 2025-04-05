const joi = require("joi");
const { password } = require("./custom.validation");

exports.createUserSchema = {
  body: joi.object().keys({
    username: joi.string().trim().min(3).max(50).required(),
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().trim().custom(password).min(8).required(),
  }),
};
exports.loginSchema = {
  body: joi.object().keys({
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().trim().min(8).required(),
  }),
};
exports.resetPasswordSchema = {
  params: joi.object().keys({
    token: joi.string().required(),
  }),
  body: joi.object().keys({
    password: joi.string().trim().custom(password).min(8).required(),
  }),
};
