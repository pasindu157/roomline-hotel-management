import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { fetchUserProfile } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/profile", requireAuth, fetchUserProfile);

export default userRouter;
