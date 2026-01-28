import nodemailer from "nodemailer";

const sendEmail = async (email, generateOTP) => {
  // 🔑 Create transporter INSIDE function
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });



  await transporter.sendMail({
    from: `"FastTutors" <${process.env.EMAIL}>`,
    to: email,
    subject: "Your OTP for Tutor Registration",
    html: `
      <h2>Email Verification</h2>
      <h1>${generateOTP}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  });
};

export default sendEmail;
