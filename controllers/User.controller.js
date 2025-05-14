const jsonWenToken = require("jsonwebtoken");
const bcryptJs = require("bcryptjs");

// user model
const UserModel = require("../models/User.model.js");
const OTPModel = require("../models/OTP.model.js");
const getOtp = require("../helpers/generateOtp.js");
const sendOtp = require("../helpers/sendOtp.js");
const generateCookie = require("../helpers/generateCookie.js");
// User registration method
const registerUser = async (req, res) => {
  // extracting form data
  const { name, email, number, username, password } = req.body;
  const  filename  = req.file?.filename || 'uploads/defaultProfile.png'
  try {
    // start user registration process
    bcryptJs.genSalt(10, (error, salt) => {
      bcryptJs.hash(password, salt, async (error, encryptedPassword) => {
        const createdUser = await UserModel.create({
          name,
          email,
          username,
          number,
          profileImage: `${process.env.BASE_URL}/${filename}`,
          password: encryptedPassword,
        });
        
        // sending cookie
        const cookie = generateCookie(email);
        res.cookie("token", cookie);

        // sending response after sending verification code
        if (createdUser) {
          return res.json({
            message: "Verification has been set to your number!",
            status: 200,
            user: await UserModel.findOne({ email: createdUser.email }).select(
              "-password"
            ),
          });
        }
      });
    });
  } catch (error) {
    return res.json({
      message: `Internal server error ${error.message}`,
      status: 500,
    });
  }
};


// login method
const userLogin = async(req, res) => {
  const { password, number } = req.body;
  const userForLoginProcess = await UserModel.findOne({number : number})
  if (!password || !number) {
    return res.json({
      message: "Number and password is required!",
      status: 401,
    });
  }
  // password checking
  const isPasswordCorrect = bcryptJs.compare(
    password,
    userForLoginProcess.password
  );
  if (!isPasswordCorrect) {
    return res.json({
      message: "Incorrect password!",
      status: 403,
    });
  }
  //    if password is right
  const token = generateCookie(userForLoginProcess.email);
  res.cookie("token", token);
  return res.json({
    message: "Loggedin Sucessfully!",
    status: 200,
    user : await UserModel.findOne({email : userForLoginProcess.email}).select('-password')
  });
};

// Exporting all methods
module.exports = { registerUser, userLogin };
