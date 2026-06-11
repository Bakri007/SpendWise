const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");
const statusText = require("../utils/statusText");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new AppError(errors.array()[0].msg, 400, statusText.FAIL)
    );
  }
  next();
};

module.exports = validate;