const express = require("express");
const app = express();
const { errorHandler, errorConvertor } = require("./middleware/error");
const { status } = require("http-status");
const CustomError = require("./utils/customError");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//auth Routes

app.use("/api/auth", authRouter);

//error handler middleware
app.use((req, res, next) => {
  next(new CustomError(status.NOT_FOUND, "Not Found"));
});
app.use(errorConvertor);
app.use(errorHandler);

module.exports = app;
