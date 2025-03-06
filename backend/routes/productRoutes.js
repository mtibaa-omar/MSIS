import { Router } from "express";
import { protect } from "../controllers/authController.js";
import {
  addProduct,
  getProduct,
  getProducts,
  getProductsBySubCategorySlug,
} from "../controllers/productController.js";

const router = Router();

router.route("").post(protect, addProduct).get(protect, getProducts);
router.get("/:slug", getProductsBySubCategorySlug);
router.get("/product/:id", getProduct);

// router
//   .route("/:id")
//   .put(protect, updateCategory)
//   .delete(protect, deleteCategory);

export default router;
