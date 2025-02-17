import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import hpp from "hpp";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import uploadRouter from "./routes/uploadRoute.js";
import categoryRouter from "./routes/categoryRoutes.js";
import subcategoryRouter from "./routes/subCategoryRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();

// MIDDELWARES

// Set security HTTP headers
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
// Limit requests from same IP
const limiter = rateLimit({
  max: 250,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use(limiter);

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(ExpressMongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// Enable response compression
app.use(compression());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/file", uploadRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subcategoryRouter);
app.use("/api/products", productRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
export default app;
