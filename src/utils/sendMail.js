const config = require("../config/config");

const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.mailerPort,
    secure: true,
    auth: {
      user: config.userEmail,
      pass: config.gmailAppPassword,
    },
  });
  const mailOptions = {
    from: config.userEmail,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendMail;
