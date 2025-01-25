import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updatePassword,
  verifyEmail,
} from "../controllers/authController.js";
import {
  getAllUsers,
  deleteUser,
  updateMe,
  deleteMe,
} from "../controllers/userController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", protect, logout);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});
router.patch("/updateMyPassword", protect, updatePassword);

router.patch("/updateMe", protect, updateMe);
router.delete("/deleteMe", protect, deleteMe);

router.post("/verifyEmail", verifyEmail);
router
  .route("/")
  .get(protect, getAllUsers)
  .delete(protect, restrictTo, deleteUser);

router
  .route("/:id")
  .delete(protect, restrictTo("ADMIN", "MODERATOR"), deleteUser);
export default router;
