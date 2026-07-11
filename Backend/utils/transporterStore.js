const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohatef11777@gmail.com",
    pass: "dggkxwglifgxbbdo",
  },
});

module.exports = transporter;