import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import PendingUser from "../model/pending_users.js";
import { reqOtp } from "./otpController.js";
import User from "../model/user.js"

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, agreeToTerms, state, country } = req.body;
 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = email.split('@')[0];
    const profileImg = ""

    // Save to pending collection
    await PendingUser.create({
      firstName,
      lastName,
      email,
      userId,
      profileImg,
      password: hashedPassword,
      agreeToTerms, 
      address: {state, country}
    });

    // Send OTP
    const isSendOtp = await reqOtp(email);

    if (isSendOtp) {
      res.status(200).json({ message: "OTP sent successfully", success: true });
    } else {
      res.status(500).json({ message: "Failed to send OTP", success: false });
    }

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found', success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password', success: false });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2d' });

    res.cookie('Authtoken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none', 
      maxAge: 15*24*60*60*1000 // 15 days
    });
 
    res.status(200).json({ message: 'User logged in successfully', success: true});
  } catch (err) {
    res.status(500).json({ message: 'Server error', success: false });
  }
};

const checkAuth = async (req, res) => {
  const { user } = req;

  const userDetails = await User.findOne( { email: user.email });

  userDetails.password = ""
 
  res.status(200).json({ message: 'User is authenticated', success: true, userDetails });
}

const handleLogout = async (req, res) => {
  try{
    const token = req.cookies;

    res.cookie('Authtoken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none', 
      expires: new Date(0),
    });

    res.status(200).json({ message: 'User logged out successfully', success: true });
  }catch(err) { 
    res.status(500).json({ message: 'Server error', success: false });
  }
}


export { registerUser, loginUser, checkAuth, handleLogout };
