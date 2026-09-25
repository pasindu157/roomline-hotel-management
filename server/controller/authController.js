//register function
import { sendVerificationMail, verifyEmail } from "../middleware/mailer.js";
import User from "../model/User.js";
import { userValidator } from "../validations/userAuthValidator.js";
import bcrypt from "bcryptjs";

//user register
export const register = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;
    if (
      !name?.trim() ||
      !email?.trim() ||
      !String(phone).trim() ||
      !password?.trim() ||
      !confirmPassword?.trim()
    ) {
      return res.status(400).json({ errorMsg: "All fields are required" });
    }

    const toValidateData = {
      name,
      email,
      phone,
      password,
      confirmPassword,
    };

    //validate data
    const validateResults = userValidator(toValidateData);

    if (validateResults.length > 0) {
      console.log("validations error");
      for (let i = 0; i < validateResults.length; i++) {
        console.log(validateResults[i]);
      }
      return res.status(422).json({
        errorMsg: "check your details",
        validateData: validateResults,
      });
    }

    //check existing user
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }],
    });

    if (existingUser) {
      const field =
        existingUser.email === email.toLowerCase() ? "Email" : "Phone";
      return res.status(409).json({ errorMsg: `${field} already registered` });
    }

    console.log(`password is ${password}`);

    //password hash
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: String(phone).trim(),
      password: hashedPassword,
      role: "customer",
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    //send verification mail
    sendVerificationMail(newUser.email).catch((err) => {
      console.log("verification email failed", err);
    });

    //save user in the database
    await newUser.save();

    return res.status(201).json({
      success:
        "Registerd successfully! Please check your email to verify your account",
      newUser,
    });
  } catch (error) {
    console.error("register error", error);
    return res.status(500).json({ errorMsg: "Something went wrong" });
  }
};

//login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ errorMsg: "all fields are required" });
    }

    //checking if any user exists from this email
    const userExists = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!userExists) {
      return res.status(404).json({ errorMsg: "Invalid email or password" });
    }

    //is this password correct
    const isPasswordMatch = await bcrypt.compare(password, userExists.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ errorMsg: "Invalid email or password" });
    }

    //chcking if the email id verified
    const isEmailVerified = userExists.isEmailVerified;

    if (!isEmailVerified) {
      return res
        .status(400)
        .json({ errorMsg: "please verify your email account!" });
    }

    //store in a sesssion
    req.session.userId = userExists._id;
    req.session.role = userExists.role;
    req.session.hotelId = userExists.hotelId || null;
    req.session.name = userExists.name;

    //update lastLoginAt attibute in database
    userExists.lastLoginAt = new Date();
    await userExists.save();

    //return success msg with user data
    return res.status(200).json({
      success: "successfully Logged in!",
      user: {
        id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        role: userExists.role,
        hotelId: userExists.hotelId,
      },
    });
  } catch (error) {
    console.error("login error", error);
    return res.status(500).json({ errorMsg: "Internal server error" });
  }
};

//logout function
export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error ", err);
      return res
        .status(500)
        .json({ errorMsg: "Could not log out, please try again" });
    }

    res.clearCookie("hotel.sid");
    return res.status(200).json({ success: "Logged out successfully" });
  });
};
