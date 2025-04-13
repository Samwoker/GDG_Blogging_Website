const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    username: {
      type: String,
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
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    profile: {
      bio: {
        type: String,
        trim: true,
        maxlength: 500
      },
      socialLinks: {
        twitter: String,
        linkedin: String,
        github: String
      }
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const encryptedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordToken = encryptedToken;
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
