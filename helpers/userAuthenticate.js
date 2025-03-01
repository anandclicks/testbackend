const jsonwebtoken = require("jsonwebtoken");
const UserModel = require("../models/User.model");

const userAuthantication = async (req, res, next) => {
  const cookie = req.cookies.token;
  console.log(cookie);
  
  if (!cookie) {
    return res.json({
      messaeg: "You need to login!",
      status: 403,
    });
  } else {
    const dcryptCookie = jsonwebtoken.verify(cookie, process.env.JWT_SECREAT);
    if (!dcryptCookie) {
      return res.json({
        message: "Something is wrong! you need to login!",
        status: 403,
      });
    }
    const loggedInUser = await UserModel.findOne({email: dcryptCookie.email}).select('-password');
    if (!loggedInUser) {
      return res.json({
        message: "User not found!",
        status: 404,
      });
    };
    // if everything is done so attach the logged in user details 
    req.loggedInUser = loggedInUser;
    next()
  }
};

module.exports = userAuthantication;