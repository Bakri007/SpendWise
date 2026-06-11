const statusText = require("../utils/statusText");

const handelError = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || statusText.ERROR,
    message: err.message || "Internal Server Error",
    code: err.statusCode || 500,
  });
};

module.exports = handelError;