import { Redis } from "@upstash/redis";
import bcrypt from "bcrypt";
import PendingUser from "../model/pending_users.js";
import User from "../model/user.js";
import { redis } from "../config.js"

const saveOtp = async (email, otp) => {
  const hashOtp = await bcrypt.hash(otp, 10);
  await redis.set(`otp:${email}`, hashOtp, { ex: 300 });
  console.log(`✅ OTP saved for ${email}`);
};

const verifyOtp = async (req, res) => {
  console.log(req.body);
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const backendOtp = await redis.get(`otp:${email}`);
    if (!backendOtp) {
      return res.status(400).json({ success: false, message: "OTP expired or not found" });
    }

    // Compare plain OTP (from user) with hashed OTP (from Redis)
    const isMatch = await bcrypt.compare(otp, backendOtp);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP verified successfully
    await redis.del(`otp:${email}`);

    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
      return res.status(404).json({ success: false, message: "Pending user not found" });
    }

    // Move user from PendingUser → User
    await User.create({
      firstName: pendingUser.firstName,
      lastName: pendingUser.lastName,
      email: pendingUser.email,
      password: pendingUser.password,
      phone: pendingUser.phone,
      agreeToTerms: pendingUser.agreeToTerms,
      address: pendingUser.address
    });

    await pendingUser.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Verification Successful",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { saveOtp, verifyOtp };
