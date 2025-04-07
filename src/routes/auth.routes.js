const express = require("express");
const passport = require("passport");
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

// Redirect to Google for authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//Google callback Url
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleLoginCallback
);

module.exports = router;
