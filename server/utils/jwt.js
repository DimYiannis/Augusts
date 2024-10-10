const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const istokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  console.log("NODE_ENV:", process.env.NODE_ENV);
  

  res.cookie("token", token, {
    httpOnly: true,
    expires:new Date(Date.now() + oneDay),
    //secure:process.env.NODE_ENV !== 'production' , // dev
    secure:process.env.NODE_ENV === 'production' , //production
    signed:true,
    sameSite: 'None',
    
  });
};

const logoutUser = (req, res) => {
  if (!res || typeof res.clearCookie !== 'function') {
    throw new Error("Response object is undefined or does not have clearCookie function");
  }

  console.log('Clearing cookie...');

  // Clear the 'token' cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
    signed: true,
  });

  res.status(200).json({ message: 'User logged out successfully' });
};



module.exports = {
  createJWT,
  istokenValid,
  attachCookiesToResponse,
  logoutUser
};
