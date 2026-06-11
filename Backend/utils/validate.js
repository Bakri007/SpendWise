const AppError = require("./appError");
const statusText = require("./statusText");

function isName(name) {
  if (!/[A-Z]/.test(name[0])) {
    throw new AppError(`first letter must be capital in ${name}`, 400, statusText.FAIL);
  } else if (!/^[A-Za-z]+$/.test(name)) {
    throw new AppError(`${name} must contain letters only`, 400, statusText.FAIL);
  } else if (name.length < 2 || name.length > 20) {
    throw new AppError(`${name} length must be between 2 and 20 characters`, 400, statusText.FAIL);
  }
  return true;
}

function isEmail(email) {
  if (!/^[a-zA-Z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z]{2,})+$/.test(email)) {
    throw new AppError("Invalid Email", 400, statusText.FAIL);
  }
  return true;
}

function isStrongPassword(password) {
  if (password.length < 8) {
    throw new AppError("Password length must be more than 8 characters", 400, statusText.FAIL);
  } else if (!/[a-z]/.test(password)) {
    throw new AppError("Password must contain at least one lowercase letter", 400, statusText.FAIL);
  } else if (!/[A-Z]/.test(password)) {
    throw new AppError("Password must contain at least one uppercase letter", 400, statusText.FAIL);
  } else if (!/[0-9]/.test(password)) {
    throw new AppError("Password must contain at least one number", 400, statusText.FAIL);
  } else if (!/\W/.test(password)) {
    throw new AppError("Password must contain at least one special character", 400, statusText.FAIL);
  }
  return true;
}

function testText(text) {
  if (!/^[a-zA-Z0-9\s\-]+$/.test(text)) {
    throw new AppError(`${text} must contain A-Z, a-z, 0-9, space and - only`, 400, statusText.FAIL);
  }
  return true;
}

module.exports = { isName, isEmail, isStrongPassword, testText };