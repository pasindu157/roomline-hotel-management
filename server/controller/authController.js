//register function
import { sendVerificationMail } from "../middleware/mailer.js";
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

//verify email function
export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const emailExists = await User.findOne({ email });

    if (!emailExists) {
      return res.status(404).json({ errorMsg: "User does not exists!" });
    }
    if (emailExists.isEmailVerified === true) {
      return res.status(200).json({ success: "User is already verified!" });
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

    return res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <!-- Automatically redirects to login after 3 seconds -->
      <meta http-equiv="refresh" content="3;url=http://localhost:5173/login" />
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f1f5f9;
          margin: 0;
        }
        .card {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 420px;
        }
        h1 { color: #10b981; font-size: 24px; margin-bottom: 12px; }
        p { color: #64748b; font-size: 15px; margin-bottom: 24px; line-height: 1.5; }
        .btn {
          background-color: #2563eb;
          color: white;
          padding: 12px 28px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          transition: background-color 0.2s;
        }
        .btn:hover { background-color: #1d4ed8; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>✓ Email Verified!</h1>
        <p>Your email has been verified successfully. Redirecting you to the sign-in page in 3 seconds...</p>
        <a href="http://localhost:5173/login" class="btn">Go to Sign In</a>
      </div>
    </body>
  </html>
`);
  } catch (error) {
    console.log("error occured in verifying email", error);
    return res.status(500).json({ errorMsg: "Internal server error" });
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
