require("dotenv").config();
const { envValidation } = require("../validation");
const logger = require("./logger");

const { value: envVars, error } = envValidation.envSchema.validate(process.env);
if (error) {
  logger.error(error.message);
}

module.exports = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
  jwtSecret: envVars.JWT_SECRET,
  gmailAppPassword: envVars.GMAIL_APP_PASSWORD,
  userEmail: envVars.USER_EMAIL,
  host: envVars.HOST,
  mailerPort: envVars.MAILER_PORT,
  googleClientId: envVars.GOOGLE_CLIENT_ID,
  googleClientSecret: envVars.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: envVars.GOOGLE_CALLBACK_URL,
  rateLimiter: {
    maxAttemptsByIPUsername: envVars.MAX_ATTEMPTS_BY_IP_USERNAME,
    maxAttemptsPerDay: envVars.MAX_ATTEMPTS_PER_DAY,
    maxAttemptsPerEmail: envVars.MAX_ATTEMPTS_PER_EMAIL,
  },
};
