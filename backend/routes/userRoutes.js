import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  updateUserProfile,
  userProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getAllUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, userProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default router;
