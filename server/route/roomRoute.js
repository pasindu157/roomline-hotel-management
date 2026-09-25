import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { upload } from "../middleware/upload.js";
import {
  bulkRoomCreate,
  deleteRoom,
  getRoomsByHotelId,
  updateRoom,
} from "../controller/roomController.js";

const roomRouter = express.Router();

roomRouter.post(
  "/bulk-create",
  requireAuth,
  requireRole("admin", "manager"),
  upload.array("images", 5),
  bulkRoomCreate,
);
roomRouter.put(
  "/update",
  requireAuth,
  requireRole("admin", "manager"),
  updateRoom,
);
roomRouter.put(
  "/delete",
  requireAuth,
  requireRole("admin", "manager"),
  deleteRoom,
);
roomRouter.get(
  "/get-by-hotel-id/:hotelId",
  requireAuth,
  requireRole("admin", "manager"),
  getRoomsByHotelId,
);

export default roomRouter;
