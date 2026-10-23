import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);

    console.log("Connected to DB");
  } catch (error) {
    console.log("Error while connecting to DB");
  }
};
