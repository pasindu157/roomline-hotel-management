import mongoose from "mongoose";

const hotelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      line1: { type: String, required: true },
      city: { type: String, requried: true },
    },
    description: {
      type: String,
      maxLength: 2000,
    },
    coverImage: {
      type: String,
    },
    gallery: [
      {
        type: String,
      },
    ],

    timezone: { type: String, default: "Asia/Colombo" },
    currency: { type: String, default: "LKR", uppercaseL: true },

    checkInTime: { type: String, default: "14:00" },
    checkOutTime: { type: String, default: "11:00" },

    starRating: {
      type: Number,
      min: 1,
      max: 5,
    },

    amenities: {
      type: [String],
      default: [],
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requried: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended", "closed"],
      default: "active",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Hotel", hotelSchema);
