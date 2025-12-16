import nodemailer from "nodemailer"; 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (email, otp) => {
  console.log("Sending OTP to:", email);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  };
  
  const info = await transporter.sendMail(mailOptions);

  return info.accepted && info.accepted.length > 0; 
};

// ✅ correct export
export { sendOtpEmail };