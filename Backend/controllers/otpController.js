import { saveOtp } from "../service/otpServices.js";
import { sendOtpEmail } from "../service/sendMail.js";

const generateOtp = () => {
  const otpChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * otpChars.length);
    otp += otpChars[randomIndex];
  } 
  return otp;  
};

const reqOtp = async (email) => {
  const otp = generateOtp();
  await saveOtp(email, otp);
  const isSendEmail = await sendOtpEmail(email, otp);

  return(isSendEmail)
}


export { reqOtp }