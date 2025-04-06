const jwt = require("jsonwebtoken");
const config = require("./../config/config");
const { status } = require("http-status");
const CustomError = require("./../utils/customError");
const { userService } = require("../services");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new CustomError(status.UNAUTHORIZED, "Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const id = decoded.sub;
    const user = await userService.getById(id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(status.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
};
module.exports = authenticate;
