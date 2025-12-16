import jwt from 'jsonwebtoken'; 

export const verifyUserIsLoggedIn = (req, res, next) => {
  const token = req.cookies.Authtoken; 

  if(!token) {
    return res.status(401).json({ message: 'No token, authorization denied', success: false });
  }

  const secret = process.env.JWT_SECRET;

  try{ 
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  }
  catch(err) { 
    res.status(401).json({ message: 'Token is not valid', success: false });
  }
}