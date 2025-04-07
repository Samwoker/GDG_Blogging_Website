const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");
const httpServer = http.createServer(app);
const config = require("./config/config");
const profileRoutes = require('./routes/profile.routes');
const logger = require("./config/logger");

mongoose
  .connect(config.dbConnection,{
    serverSelectionTimeoutMS: 30000,  autoCreate: true,})
  .then(() => logger.info("DB connected successfully"))
  .catch((err) => logger.error(err));

app.use('/api/profile', profileRoutes);
const server = httpServer.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});


