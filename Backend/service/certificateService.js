import User from "../model/user.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { v2 as cloudinary } from "cloudinary";
import { createCanvas, loadImage } from "canvas";
import QRCode from "qrcode";
import sharp from "sharp";
import { v4 as uuid } from "uuid";

export const certificateService = async (payload) => {
  try {
    const { courseName, email } = payload;

    if (!courseName || !email) return false;

    // Fetch User
    const user = await User.findOne({ email });
    if (!user) return false;

    const certData = {
      email,
      name: user.firstName + " " + user.lastName,
      courseName,
      date: new Date().toLocaleDateString("en-CA"),
      certificateId: uuid(),
      certificateUrl: "",
    };

    const uploadedUrl = await createCertificateImage(certData);
    if (!uploadedUrl) return false;

    certData.certificateUrl = uploadedUrl;

    await saveCertificateRecord(certData);

    return certData;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// Save Certificate Record
export const saveCertificateRecord = async (data) => {
  await User.updateOne(
    { email: data.email },
    {
      $push: {
        certificates: {
          candidateName: data.name,
          courseName: data.courseName,
          data: data.date, 
          certificateId: data.certificateId,
          certificateUrl: data.certificateUrl,
        },
      },
    }
  );
 
};

// Certificate Generator
export async function createCertificateImage(cert) {
  const { name, date, courseName, certificateId } = cert;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const templatePath = join(__dirname, "../certificates/certificate.png");

  const template = await sharp(templatePath).metadata();
  const canvas = createCanvas(template.width, template.height);
  const ctx = canvas.getContext("2d");

  const baseImg = await loadImage(templatePath);
  ctx.drawImage(baseImg, 0, 0, template.width, template.height);

  // Draw Name
  ctx.font = "bold 70px serif";
  ctx.fillStyle = "#121111";
  ctx.textAlign = "center";
  ctx.fillText(name, template.width / 2, template.height / 1.95);

  // Draw Course Name
  ctx.fillStyle = "#fff";
  ctx.fillText(
    courseName.charAt(0).toUpperCase() + courseName.slice(1),
    template.width / 2,
    template.height / 1.52
  );

  // Generate QR Code
  const qrValue = `https://learncode.com/certificate/${certificateId}`;
  const qrBuffer = await QRCode.toBuffer(qrValue, {
    width: 180,
    margin: 1,
    color: { dark: "#000000", light: "#ffffff" },
  });

  const qrImg = await loadImage(qrBuffer);
  ctx.drawImage(qrImg, template.width * 0.07, template.height * 0.7, 160, 160);

  // Earned On + ID
  ctx.font = "32px serif";
  ctx.fillStyle = "#000";
  ctx.textAlign = "left";
  ctx.fillText(
    `Earned On: ${date}`,
    template.width * 0.07,
    template.height * 0.845
  );
  ctx.fillText(
    `Certificate ID: ${certificateId}`,
    template.width * 0.07,
    template.height * 0.88
  );

  const finalImageBuffer = canvas.toBuffer("image/png");

  return uploadToCloudinary(finalImageBuffer, certificateId);
}

// Cloudinary Upload
const uploadToCloudinary = async (buffer, certificateId) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "certificates",
        public_id: certificateId,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(null);
        }
        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
};
