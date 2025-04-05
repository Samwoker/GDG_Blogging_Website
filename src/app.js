const express = require("express");
const app = express();
const { errorHandler, errorConvertor } = require("./middleware/error");
const { status } = require("http-status");
const CustomError = require("./utils/customError");

//error handler middleware
app.use((req, res, next) => {
  next(new CustomError(status.NOT_FOUND, "Not Found"));
});
app.use(errorConvertor);
app.use(errorHandler);

module.exports = app;
