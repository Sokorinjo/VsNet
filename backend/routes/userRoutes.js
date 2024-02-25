import express from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  getAllUsers
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import handleRefreshToken from "../controllers/refreshTokenController.js";
const router = express.Router();

router.get("/allusers", protect, getAllUsers)
router.get("/refresh", handleRefreshToken)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.route("/profile").get(protect, getUserProfile).patch(protect, updateUserProfile);

export { router };
