import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
