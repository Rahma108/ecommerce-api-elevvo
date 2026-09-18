import { Router } from "express";
import rateLimit from "express-rate-limit";
import { register, login } from "../controllers/auth.controller";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: { success: false, message: "Too many attempts, try again later" },
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

export default router;