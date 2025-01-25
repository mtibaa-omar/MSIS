import connectDB from "./config/connectDB.js";
import app from "./app.js";

const PORT = 5000 || process.env.PORT;
connectDB();
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
