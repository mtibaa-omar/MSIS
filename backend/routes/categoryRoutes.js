import { Router } from "express";
import { protect } from "../controllers/authController.js";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.route("").get(protect, getCategory).post(protect, addCategory);
router
  .route("/:id")
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

export default router;
