const mongoose = require("mongoose");
const { isName, isEmail, isStrongPassword } = require("../utils/validate");
const userRoles = require("../utils/userRoles");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      validate: [isName, "Invalid Name"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [isEmail, "Invalid Email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    currency: {
      type: String,
      default: "EGP",
    },
    role: {
      type: String,
      enum: [userRoles.ADMIN, userRoles.USER],
      default: userRoles.USER,
    },
    resetCode: {
      type: String,
    },
    resetCodeExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;