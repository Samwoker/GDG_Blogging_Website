const winston = require("winston");
const { format, createLogger, transports } = winston;
const { printf, combine, timestamp } = format;
const config = require("./config");

const winstonFormat = printf(({ level, timestamp, message, stack }) => {
  return `${timestamp} : ${level} : ${stack || message}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(timestamp(), winstonFormat),
  transports: [new transports.Console()],
});

module.exports = logger;
