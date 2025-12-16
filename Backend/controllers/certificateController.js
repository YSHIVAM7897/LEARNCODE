import User from "../model/user.js";
import { certificateService } from "../service/certificateService.js";

export const generateCertificate = async (req, res) => { 
  try { 
    const { user } = req;
    const { courseName } = req.body;
 
    if (!courseName) {
      return res.status(400).json({
        msg: "Missing fields: courseName and score are required",
      });
    } 

    const userAleadyHasCert = await User.findOne({ email : user.email, "certificates.courseName": courseName });


    if(userAleadyHasCert) {
       const certificate = userAleadyHasCert.certificates.find(x => x.courseName === courseName);
      return res.status(400).json({ 
        msg: "Certificate already generated for this course",
        data: certificate
      });
    }

    const serviceStatus = await certificateService({email: user.email, courseName});

    if (!serviceStatus) {
      return res.status(400).json({ msg: "Certificate generation failed"});
    }
 
    return res.status(200).json({
      msg: "Certificate generated successfully",
      data: serviceStatus,
    });

  } catch (err) {
    console.error("Certificate Controller Error:", err);
    return res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};

export const getCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const cert = await User.findOne({ "certificates.certificateId": certificateId },
  { "certificates.$": 1, firstName:1, lastName:1 });

    if (!cert) {
      return res.status(404).json({ msg: "Certificate not found" });
    }

    console.log(cert);

    return res.status(200).json({data : cert});

  } catch (err) {
    return res.status(500).json({ msg: "Server error", err: err.message});
  }
}

export const getAllCertificates= async (req, res) => {
  try {
    const { user } = req;
    const data = await User.findOne({ email: user.email });
    res.status(200).json({ msg: "Certificates fetched successfully", data });
  }catch(err) {
    res.status(500).json({ msg: "Server error", err: err.message});
  }
}