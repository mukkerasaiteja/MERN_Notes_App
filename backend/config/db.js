import mongoose from "mongoose";
import { Mongo_URL } from "../config.js";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(Mongo_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("Error connecting with DB" + err);
    process.exit(1);
  }
}

//export default connectDB;
