import express from "express";
import {
  fetchAllLanguages,
  fetchLanguageBySlug,
  fetchLanguageModules,
  fetchQuizData
} from "../controllers/fetchData.js";

import { verifyUserIsLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Language Content Routes
router.get("/getLanguage", fetchAllLanguages);
router.get("/getLanguage/:slug", fetchLanguageBySlug);
router.get("/getTopic/:slug/:module", fetchLanguageModules);
router.get("/getQuiz/:slug", verifyUserIsLoggedIn, fetchQuizData);

export default router;
