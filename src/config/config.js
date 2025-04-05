require("dotenv").config();
const { envValidation } = require("../validation");

const { value: envVars, error } = envValidation.envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
  jwtSecret: envVars.JWT_SECRET,
};
