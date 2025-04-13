const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const logDirectory = path.join(__dirname, "..", "logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

morgan.token("message", (req, res) => res.locals.errorMessage || "");
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" } 
);
const successHandlerFormat = `:method :url :status :response-time ms :user-agent :date`;
const errorHandlerFormat = `:method :url :status :response-time ms :user-agent :date - error-message :message`;

const successHandler = morgan(successHandlerFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode >= 400, 
});

const errorHandler = morgan(errorHandlerFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400, 
});

module.exports = {
  successHandler,
  errorHandler,
};
