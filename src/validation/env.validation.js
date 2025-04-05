const joi = require("joi");

exports.envSchema = joi
  .object({
    DB_CONNECTION: joi.string().required(),
    PORT: joi.number().positive().default(3000),
  })
  .unknown();
