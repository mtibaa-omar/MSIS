import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Please provide a MONGODB_URI in the .env file");
}
const DB = process.env.MONGODB_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
async function connectDB() {
  try {
    await mongoose.connect(DB);
    console.log("DB connection successful!");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
}
export default connectDB;
