const express = require("express");
const app = express();
const { errorHandler, errorConvertor } = require("./middleware/error");
const { status } = require("http-status");
const CustomError = require("./utils/customError");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");

const {
  googleStrategy,
  serializeUserFunction,
  deserializeUserFunction,
} = require("./config/passport");

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//initialize passport

app.use(passport.initialize());

passport.use(googleStrategy);
passport.serializeUser(serializeUserFunction);
passport.deserializeUser(deserializeUserFunction);

//auth Routes

app.use("/api/auth", authRouter);

//error handler middleware
app.use((req, res, next) => {
  next(new CustomError(status.NOT_FOUND, "Not Found"));
});
app.use(errorConvertor);
app.use(errorHandler);

module.exports = app;
