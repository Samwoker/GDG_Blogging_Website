const validator = require("validator");

exports.password = (value, helpers) => {
  if (!validator.isStrongPassword(value)) {
    return helpers.message(
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
    );
  }
  return value;
};
