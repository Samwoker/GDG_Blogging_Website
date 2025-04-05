const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const validate = require("./../middleware/validation");
const { userValidation } = require("../validation");

router.post(
  "/register",
  validate(userValidation.createUserSchema),
  authController.register
);

module.exports = router;
