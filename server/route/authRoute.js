import express from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
} from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/customer/register", register);
authRouter.get("/verify-email", verifyEmail);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
