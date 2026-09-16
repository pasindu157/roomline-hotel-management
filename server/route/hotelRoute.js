import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import {
  createHotel,
  getAllHotelsByUserId,
} from "../controller/hotelController.js";
import { verifyHotelEmail } from "../middleware/mailer.js";

const hotelRouter = express.Router();

hotelRouter.post("/create", requireAuth, requireRole("admin"), createHotel);
hotelRouter.get("/verify-email", verifyHotelEmail);
hotelRouter.get(
  "/get-all",
  requireAuth,
  requireRole("admin"),
  getAllHotelsByUserId,
);

export default hotelRouter;
