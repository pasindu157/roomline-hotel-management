import nodemailer from "nodemailer";
import "dotenv/config";
import User from "../model/User.js";
import { hotelRedirecHTML, userRedirectHTML } from "../data.js";
import Hotel from "../model/Hotel.js";

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

export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const emailExists = await User.findOne({ email });

    if (!emailExists) {
      return res.status(404).json({ errorMsg: "Email does not exists!" });
    }
    if (emailExists.isEmailVerified === true) {
      return res.status(200).json({ success: "Email is already verified!" });
    }
    if (
      emailExists.emailVerificationExpires &&
      emailExists.emailVerificationExpires < new Date()
    ) {
      return res.status(400).json({
        errorMsg:
          "Verification link has expired. Please register or request a new link",
      });
    }

    emailExists.isEmailVerified = true;
    emailExists.emailVerificationExpires = undefined;
    await emailExists.save();

    return res.send(userRedirectHTML);
  } catch (error) {
    console.log("error occured in verifying email", error);
    return res.status(500).json({ errorMsg: "Internal server error" });
  }
};

export const verifyHotelEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const emailExists = await Hotel.findOne({ email });

    if (!emailExists) {
      return res.status(404).json({ errorMsg: "Email does not exists!" });
    }
    if (emailExists.isEmailVerified === true) {
      return res.status(200).json({ success: "Email is already verified!" });
    }
    if (
      emailExists.emailVerificationExpires &&
      emailExists.emailVerificationExpires < new Date()
    ) {
      return res.status(400).json({
        errorMsg:
          "Verification link has expired. Please register or request a new link",
      });
    }

    emailExists.isEmailVerified = true;
    emailExists.emailVerificationExpires = undefined;
    await emailExists.save();

    return res.send(hotelRedirecHTML);
  } catch (error) {
    console.log("error occured in verifying email", error);
    return res.status(500).json({ errorMsg: "Internal server error" });
  }
};
