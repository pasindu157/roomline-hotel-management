import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import mongoose from "mongoose";

//middleware
const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;

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
