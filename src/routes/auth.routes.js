const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const validate = require("./../middleware/validation");
const { userValidation } = require("../validation");
const authenticate = require("../middleware/auth");

router.post(
  "/register",
  validate(userValidation.createUserSchema),
  authController.register
);
router.post(
  "/login",
  validate(userValidation.loginSchema),
  authController.login
);
router.post("/logout", authenticate, authController.logout);

router.post("/reset-password/request", authController.passwordResetRequest);
router.post(
  "/reset-password/:token",
  validate(userValidation.resetPasswordSchema),
  authController.resetPassword
);

module.exports = router;
