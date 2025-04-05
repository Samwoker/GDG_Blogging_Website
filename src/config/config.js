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
  gmailAppPassword: envVars.GMAIL_APP_PASSWORD,
  userEmail: envVars.USER_EMAIL,
  host: envVars.HOST,
  mailerPort: envVars.MAILER_PORT,
};
