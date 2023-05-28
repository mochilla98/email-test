const nodemailer = require("nodemailer");

const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {

  console.log(nodemailerConfig);

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Mosco Tech" <random email@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
