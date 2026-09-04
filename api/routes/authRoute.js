import { Router } from "express";
import { changePassword, generateOTP, login, logout, profile, resetPassword, signUp, verifyOTP } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = Router();

router.post('/signup',signUp)
router.post('/login',login)
router.post('/logout',authMiddleware,logout)
router.post('/change-password',authMiddleware,changePassword)
router.post('/generate-otp',generateOTP)
router.post('/verify-otp',verifyOTP)
router.post('/reset-password',resetPassword)
router.get('/profile', authMiddleware, profile)

export default router;