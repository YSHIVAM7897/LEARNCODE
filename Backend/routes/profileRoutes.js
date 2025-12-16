import express from 'express';
import { updateLinks, updateEducation, uploadResume, getProfileDetails } from '../controllers/profileController.js';
import { verifyUserIsLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router(); 

router.get('/user/:userId', getProfileDetails);

router.put('/update/link', verifyUserIsLoggedIn,  updateLinks);
router.put('/update/educationDetails', verifyUserIsLoggedIn, updateEducation);
// router.put('/upload-resume', upload.single("resume"), uploadResume)

export default router;