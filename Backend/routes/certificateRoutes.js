import express from "express";
import { generateCertificate, getCertificate, getAllCertificates } from "../controllers/certificateController.js";
import { verifyUserIsLoggedIn } from "../middlewares/authMiddleware.js";
 
const router = express.Router();

// POST: Generate Certificate
router.post("/generate", verifyUserIsLoggedIn, generateCertificate);
 
// GET: Fetch Certificate by ID
router.get("/:certificateId", getCertificate);

// GET: Fetch all Certificates for logged-in user
router.get("/", verifyUserIsLoggedIn, getAllCertificates);

export default router;
