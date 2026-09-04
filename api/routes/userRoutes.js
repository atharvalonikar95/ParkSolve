import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { completeProfile, deleteContact, generateQR, getQR, getVehicleByQR, setPhone } from "../controllers/userController.js";


const router = Router();

router.patch('/complete-profile',authMiddleware,completeProfile)
router.patch('/set-phone',authMiddleware,setPhone)
router.post('/generate-qr',authMiddleware,generateQR)
router.get('/vehicle-owner/:qrToken',getVehicleByQR)
router.get('/get-qr',authMiddleware,getQR)
router.delete('/delete-contact',authMiddleware,deleteContact)
export default router;