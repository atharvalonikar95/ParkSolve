// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer'
export async function sendVerificationEmail(
  email,
  fullName,
  verifyCode
) {
  try {
    
    // 2. Nodemailer send
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    const htmlContent = `
    <h1>Hello ${fullName}</h1>
    <p>Your verification code is <strong>${verifyCode}</strong></p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verification Code - Parking Sathi",
      html:htmlContent,
    });

    return { success: true, message: "Verification email sent" };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, message: "Failed to send email" };
  }
}