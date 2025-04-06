const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");
const httpServer = http.createServer(app);
const config = require("./config/config");
const logger = require("./config/logger");

mongoose
  .connect(config.dbConnection)
  .then(() => logger.info("DB connected successfully"))
  .catch((err) => logger.error(err));

const server = httpServer.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});


