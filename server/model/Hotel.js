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
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    description: {
      type: String,
      maxLength: 2000,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    gallery: [
      {
        type: String,
      },
    ],

    timezone: { type: String, default: "Asia/Colombo" },
    currency: { type: String, default: "LKR", uppercase: true },

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
      required: true,
      index: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationExpires: {
      type: Date,
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
