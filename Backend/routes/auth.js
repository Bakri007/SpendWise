const {login, register, resetPassword, forgotPassword, verifyResetCode, getAllUsers, deleteUser, updateCurrency, changePassword} = require("../controllers/auth")
const router = require("express").Router();
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema, forgotPasswordSchema, verifyResetCodeSchema, resetPasswordSchema } = require("./auth.validation");
const { verifyToken, allowedTo } = require("../middlewares/auth");

router.post("/register", registerSchema, validate,register);
router.post("/login",loginSchema, validate,login);
router.post("/forgot-password", forgotPasswordSchema, validate,forgotPassword);
router.post("/verify-reset-code", verifyResetCodeSchema, validate,verifyResetCode);
router.post("/reset-password", resetPasswordSchema, validate,resetPassword);
router.get("/users", verifyToken, allowedTo("admin"), getAllUsers);
router.delete("/users/:id", verifyToken, allowedTo("admin"), deleteUser);
router.patch('/currency', verifyToken, updateCurrency);
router.patch('/change-password', verifyToken, changePassword);
module.exports = router;