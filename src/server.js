const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");
const httpServer = http.createServer(app);
const config = require("./config/config");
const profileRoutes = require('./routes/profile.routes');

mongoose
  .connect(config.dbConnection)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

app.use('/api/profile', profileRoutes);
const server = httpServer.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
