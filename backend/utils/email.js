import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "MSIS <msistunisia@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: "MSIS",
    html: options.html,
  };
  console.log(mailOptions);
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
