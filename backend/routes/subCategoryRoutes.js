import { Router } from "express";
import { protect } from "../controllers/authController.js";
import {
  addSubCategory,
  deleteSubCategory,
  getSubCategories,
} from "../controllers/subCategoryController.js";

const router = Router();

router.route("").post(protect, addSubCategory).get(protect, getSubCategories);

router.route("/:id").delete(protect, deleteSubCategory);
export default router;
