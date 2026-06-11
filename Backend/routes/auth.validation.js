const { body } = require("express-validator");

const registerSchema = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

const loginSchema = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const forgotPasswordSchema = [
  body("email").isEmail().withMessage("Invalid email"),
];

const verifyResetCodeSchema = [
  body("email").isEmail().withMessage("Invalid email"),
  body("resetCode").notEmpty().withMessage("Reset code is required"),
];

const resetPasswordSchema = [
  body("email").isEmail().withMessage("Invalid email"),
  body("resetCode").notEmpty().withMessage("Reset code is required"),
  body("newPassword").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

module.exports = { registerSchema, loginSchema, forgotPasswordSchema, verifyResetCodeSchema, resetPasswordSchema };