import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendVerificationMail = async (emailId) => {
  try {
    await transporter.sendMail({
      to: emailId,
      subject: "Email verification link",
      html: `
        <body>
            <h1>Verification Link</h1>
            <a href = 'http://localhost:5000/api/v1/verify-email?email=${emailId}'>Click here<a/>
        </body>
      `,
    });
    console.log("email successfully sent to ", emailId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
