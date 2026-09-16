import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "front_desk", "housekeeping", "customer"],
      default: "customer",
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: function () {
        return ["manager", "front_desk", "housekeeping"].includes(this.role);
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationExpires: {
      type: Date,
    },
    lastLoginAt: Date,
    passwordChangedAt: Date,
    avatar: String,
    address: {
      line1: String,
      line2: String,
      street: String,
      city: String,
    },
    dateOfBrith: Date,
    nationality: String,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
