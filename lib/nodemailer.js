const nodemailer = require("nodemailer");

const sendMail = async (subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });
    console.log(process.env.email, process.env.password);

    let info = await transporter.sendMail({
      from: process.env.email,
      to: "muhammadfurqan7427@gmail.com",
      subject,
      text,
    });

    console.log("Successfully sent email", info.messageId);
  } catch (error) {
    console.error("Failed to send email", error);
  }
};

module.exports = { sendMail };
