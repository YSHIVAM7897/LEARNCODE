import User from "../model/user.js";
import jwt from 'jsonwebtoken';

const getProfileDetails = async ( req, res ) => {
  try{
    const { userId } = req.params;

    if(!userId) { return res.status(404).send({msg: "uid not found"})}

    const token = req.cookies.Authtoken;
    let isLoggedIn = false;
    let userEmail = null;

    if (token != "") {
      const secret = process.env.JWT_SECRET;
      try {
        const decode =  jwt.verify(token, secret);
        userEmail = decode.email; 
      } catch (err) {
        isLoggedIn = false;
      }
    }

    const userDetail = await User.findOne({ userId : userId });

    if(!userDetail) return res.status(404).send({msg: "Data not found"});

    isLoggedIn = userDetail.email === userEmail;
    userDetail.password = "";

    return res.status(202).send({msg: "Data fetch successfully", data : userDetail, isLoggedIn});

  }catch (err) {
    res.status(404).send({msg: "Data not found"});
  }
  
}

const uploadResume = async ( req, res ) => { 
}

const updateLinks = async (req, res) => {
  try {
    const { user } = req;
    const { data } = req.body;
 
    if (data.length === 0) {
      res.status(404).send({ msg: "Data not found !" });
    }

    await User.updateOne({ email: user.email }, { $set: { links: data } });

    res.status(200).send({ msg: "Links update successfully !" });
  } catch (err) {
    res.status(500).send({ msg: "Error to save data" });
  }
};

const updateEducation = async (req, res) => {
  try{
    const { user } = req;
    const { data } = req.body;

    if(data.length === 0 || user.email === null) {
      return res.status(404).send({ msg: "Data not found !" });
    }

    await User.updateOne({ email: user.email }, { $set: { education: data } });
    return res.status(200).send({msg:"Data update successfully!", success: true});
  }catch(err) {
    res.status(500).send({msg:"server err", err});
  }
}

export { updateLinks, updateEducation, uploadResume, getProfileDetails };
