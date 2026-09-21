import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import {
  createHotel,
  deleteHotel,
  getAllHotelsByUserId,
  updateHotelDetails,
} from "../controller/hotelController.js";
import { verifyHotelEmail } from "../middleware/mailer.js";
import { upload } from "../middleware/upload.js";

const hotelRouter = express.Router();

hotelRouter.post(
  "/create",
  requireAuth,
  requireRole("admin"),
  upload.single("coverImage"),
  createHotel,
);
hotelRouter.get("/verify-email", verifyHotelEmail);
hotelRouter.get(
  "/get-all",
  requireAuth,
  requireRole("admin"),
  getAllHotelsByUserId,
);
hotelRouter.put(
  "/update/:id",
  requireAuth,
  requireRole("admin"),
  updateHotelDetails,
);
hotelRouter.put("/delete/:id", requireAuth, requireRole("admin"), deleteHotel);

export default hotelRouter;
