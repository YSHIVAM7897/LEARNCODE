import express from 'express';
import { registerUser, loginUser, checkAuth, handleLogout } from '../controllers/authController.js';
import { verifyUserIsLoggedIn } from '../middlewares/authMiddleware.js';
import { verifyOtp } from '../service/otpServices.js'; 

const router = express.Router(); 

router.post('/register', registerUser); 
router.post('/register/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.get('/checkAuth', verifyUserIsLoggedIn, checkAuth);
router.post('/logout', handleLogout);

export default router;
