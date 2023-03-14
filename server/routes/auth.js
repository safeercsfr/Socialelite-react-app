import express from "express";
import {
  forgotpassword,
  login,
  verifyEmail,
  resetPassword,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/verify-email/:id", verifyEmail);
router.post("/forgot-password", forgotpassword);
router.put("/reset-password", resetPassword);

export default router;
