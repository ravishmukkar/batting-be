// emailUtils.js

const fs = require("fs");
const path = require("path");

const createEmailBody = (name, message) => {
  let html = fs.readFileSync(path.join(__dirname, "../templates/emailTemplate.html"), "utf-8");
  html = html.replace("{{name}}", name).replace("{{message}}", message);
  return html;
};

const createForgotPasswordEmail = (name, resetLink) => {
    let html = fs.readFileSync(path.join(__dirname, "../templates/forgotPasswordEmailTemplate.html"), "utf-8");
    html = html.replace("{{name}}", name).replace("{{resetLink}}", resetLink);
    return html;
};

const createAdminCreateEmail = (name, resetLink) => {
    let html = fs.readFileSync(path.join(__dirname, "../templates/CreateAdminEmailTemplate.html"), "utf-8");
    html = html.replace("{{name}}", name).replace("{{resetLink}}", resetLink);
    return html;
};

module.exports = {
  createForgotPasswordEmail,
  createEmailBody,
  createAdminCreateEmail
  // ... other exports
};
