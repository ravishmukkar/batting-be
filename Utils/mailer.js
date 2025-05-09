const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or use host/port for other services
  auth: {
    user: "ravishmukkar98@gmail.com",
    pass: "qjcbgwyngkmtbqxn",
  },
});

// Send email function
const sendMail = async (to, subject, htmlContent) => {
  try {
    let info = await transporter.sendMail({
      from: '"Your Name" <your-email@gmail.com>',
      to, // receiver email
      subject,
      html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = sendMail;
