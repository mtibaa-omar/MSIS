import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize"; // Fixed import

import userRoutes from "./routes/userRoutes.js";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import uploadRouter from "./routes/uploadRoute.js";
import categoryRouter from "./routes/categoryRoutes.js";
import subcategoryRouter from "./routes/subCategoryRoutes.js";
import productRouter from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Get correct directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware Setup
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());

// ✅ Rate Limiting (Prevent DDoS Attacks)
const limiter = rateLimit({
  max: 250,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ Logging (Only in Development Mode)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ✅ Body Parsing (Limits Request Size)
app.use(express.json({ limit: "10kb" }));

// ✅ Data Sanitization Against NoSQL Injection
app.use(mongoSanitize());

// ✅ Prevent HTTP Parameter Pollution
app.use(hpp());

// ✅ Enable Response Compression
app.use(compression());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/file", uploadRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subcategoryRouter);
app.use("/api/products", productRouter);

// ✅ Serve Frontend in Production Mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

// ✅ Handle Undefined Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ✅ Global Error Handling
app.use(globalErrorHandler);

export default app;
