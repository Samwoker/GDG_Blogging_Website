const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    trim: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
        );
      }
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
