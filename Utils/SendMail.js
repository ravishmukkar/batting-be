const config = require("../Config")
const sgMail = require('@sendgrid/mail')
const ApiError = require("./ErrorHandler");

const sendMail = async (msg) => {
      await sgMail.setApiKey(config.SENDGRID_API_KEY)
      const response = await sgMail.send(msg);
      return response;
  };
  
module.exports = sendMail