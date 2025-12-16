import { Redis } from "@upstash/redis";
import { v2 as cloudinary } from "cloudinary";

// -------- Redis Config --------
const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

// -------- Cloudinary Config --------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log("⚙️  Redis + Cloudinary Configured Successfully");

export {redis, cloudinary};
