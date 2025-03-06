import { Router } from "express";
import { protect } from "../controllers/authController.js";
import {
  addSubCategory,
  deleteSubCategory,
  getCategoriesWithSubCategories,
  getSubCategories,
  updateSubCategory,
} from "../controllers/subCategoryController.js";

const router = Router();

router.route("").post(protect, addSubCategory).get(protect, getSubCategories);
router.get("/test", getCategoriesWithSubCategories);

router
  .route("/:id")
  .delete(protect, deleteSubCategory)
  .put(protect, updateSubCategory);

export default router;
