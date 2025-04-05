const { status } = require("http-status");
const mongoose = require("mongoose");
const CustomError = require("./../utils/customError");

const errorConvertor = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof CustomError)) {
    const statusCode = error.statusCode
      ? error.statusCode
      : error instanceof mongoose.Error
      ? status.BAD_REQUEST
      : status.INTERNAL_SERVER_ERROR;
    const message = error.message || status[statusCode];
    error = new CustomError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  const response = {
    error: true,
    code: statusCode,
    message,
    ...{ stack: err.stack },
  };
  res.locals.errorMessage = message;
  res.status(statusCode).send(response);
  next();
};

module.exports = { errorConvertor, errorHandler };
