import { Router } from "express";
import { protect } from "../controllers/authController.js";
import { addProduct, getProducts } from "../controllers/productController.js";

const router = Router();

router.route("").post(protect, addProduct).get(protect, getProducts);
// router
//   .route("/:id")
//   .put(protect, updateCategory)
//   .delete(protect, deleteCategory);

export default router;
