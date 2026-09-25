import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true,
    },
    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },
    floor: {
      type: Number,
      default: 1,
    },
    roomType: {
      type: String,
      required: true,
      enum: ["single", "double", "deluxe", "suite", "family"],
      default: "standard",
    },
    bedType: {
      type: String,
      enum: ["single", "twin", "queen", "king"],
      default: "queen",
    },
    numberOfBeds: {
      type: Number,
      default: 1,
      min: 1,
    },
    maxOccupancy: {
      adults: { type: Number, default: 2, min: 1 },
      children: { type: Number, default: 0, min: 0 },
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "LKR",
      uppercase: true,
    },
    status: {
      type: String,
      enum: ["available", "booked", "occupied", "maintenence"],
      default: "available",
    },
    cleanState: {
      type: String,
      enum: ["clean", "dirty", "in_progress"],
      default: "clean",
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

roomSchema.index({ hotelId: 1, roomNumber: 1 }, { unique: true });
export default mongoose.model("Room", roomSchema);
