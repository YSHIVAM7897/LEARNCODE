import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import languagecontentRoutes from './routes/languagecontentRoutes.js'
import authRoutes from "./routes/authRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import updateRoutes from "./routes/profileRoutes.js";
import { summitFrom } from './controllers/contact.js'

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // change later for frontend
  credentials: true
}));

app.use("/api/data", languagecontentRoutes);
app.use("/api", authRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/profile", updateRoutes);
app.post('/api/contact', summitFrom);
 
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

export default app;
