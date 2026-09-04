import { Router } from "express";
import { changeQRStatus, fetchUsers } from "../controllers/adminControllers.js";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware.js";
const router=Router()

router.get('/get-users',authMiddleware,adminMiddleware,fetchUsers)
router.patch('/change-qrStatus',authMiddleware,adminMiddleware,changeQRStatus)
export default router;