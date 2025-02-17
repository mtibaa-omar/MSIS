import { Router } from "express";
import { protect } from "../controllers/authController.js";
import {
  uploadCategoryImages,
  uploadImage,
} from "../controllers/uploadImageController.js";

const router = Router();

router.route("/upload").post(protect, uploadCategoryImages, uploadImage);

export default router;
