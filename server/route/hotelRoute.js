import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { createHotel } from "../controller/hotelController.js";
import { verifyHotelEmail } from "../middleware/mailer.js";

const hotelRouter = express.Router();

hotelRouter.post("/create", requireAuth, requireRole("admin"), createHotel);
hotelRouter.get("/verify-email", verifyHotelEmail);

export default hotelRouter;
