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
  const { filename } = req?.file;
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
        // verification code sending process
        const OTP = getOtp();
        sendOtp(number, OTP);
        const otpObj = await OTPModel.create({
          otp: OTP,
          number: number,
        });
        // sending cookie
        const cookie = generateCookie(email);
        console.log(cookie);
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

// verify phone number by otp function
const verifyOtp = async (req, res) => {
  const loggedInUser = req.loggedInUser;
  const submittedOTP = req.body.otp;
  try {
    
  if (!submittedOTP) {
    return res.json({
      message: "Otp is required!",
      status: 403,
    });
  }

  if (!loggedInUser) {
    return res.json({
      message: "You need to login to verify your Account!",
      status: 403,
    });
  }

  // finding user's verifcation OPT from databse
  const userVerificationOtp = await OTPModel.findOne({
    number: loggedInUser.number,
  });

  if (!userVerificationOtp) {
    return res.json({
      message: "Please click on resend otp button!",
      status: 400,
    });
  }

  // grabbing user's account info and checking otp
  if (userVerificationOtp.otp == submittedOTP) {
    const userForVefication = await UserModel.findOne({
      email: loggedInUser.email,
    }).select("password");
    userForVefication.varified = true;
    await userForVefication.save();
    // Deleting otp from databse
    await OTPModel.findOneAndDelete({ number: loggedInUser.number });
    return res.json({
      message: "Verification sucessfull!",
      status: 200,
    });
  } else {
    return res.json({
      message: "OTP is invalide!",
      status: 403,
    });
  }
  } catch (error) {
    return res.json({
        message : "Something is wrong! try again",
        message : 500
    })
  }
};

// resend otp method 
const resendOtp = async(req,res)=> {
  const {loggedInUser} = req
  if(!loggedInUser){
    return res.json({
      message : "You need to login first!",
      status : 403
    });
  }
  // removing existing otp if exist
  const prevOtp = await OTPModel.findOne({number : loggedInUser.number})
  if(prevOtp){
    await OTPModel.findOneAndDelete({number : loggedInUser.number})
  }
  // send otp 
  const otp = getOtp(loggedInUser.number)
  sendOtp(loggedInUser.number, otp)
 const newOtp = await OTPModel.create({
    otp : otp,
    number : loggedInUser.number
  });
  console.log(newOtp);
  

  return res.json({
    message : 'OTP has sent to your mobile number!',
    status : 200
  })
}

// login method
const userLogin = async(req, res) => {
  const { password, number } = req.body;
  const { userForLoginProcess } = req;
  console.log(userForLoginProcess);

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
module.exports = { registerUser, verifyOtp, userLogin,resendOtp };
