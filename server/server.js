import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import authRouter from "./route/authRoute.js";
import hotelRouter from "./route/hotelRoute.js";
import userRouter from "./route/userRoute.js";
import path from "node:path";
import roomRouter from "./route/roomRoute.js";

const MONGO_URI = process.env.MONGO_URI;

//middleware
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      CollectionName: "sessions",
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    },
    name: "hotel.sid",
  }),
);

app.use("/uploads", express.static("uploads"));
app.use("/api/v1/", authRouter);
app.use("/api/v1/hotel", hotelRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/room", roomRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("database connected successfully!");
  })
  .catch((err) => {
    console.log(`database error ${err}`);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
