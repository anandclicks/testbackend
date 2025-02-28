const jsonWenToken = require("jsonwebtoken");
const bcryptJs = require("bcryptjs");

// user model 
const UserModel = require("../models/User.model.js");
const OTPModel = require("../models/OTP.model.js");
const getOtp = require("../helpers/generateOtp.js");
const sendOtp = require("../helpers/sendOtp.js");
// User registration method 
const registerUser = async(req,res)=>{
    // extracting form data 
    const {name,email,number,username,password,} = req.body
    // const {file} = req.file

    try {
    // checking for user existance 
    const isExist = await UserModel.findOne({email : email});
    
    if(isExist){
        return res.json({
            message : "User with this email already exist! please use a diffrent one!",
            status : 409,
        });
    } else {
        // start user registration process 
        bcryptJs.genSalt(10,(error,salt)=>{
            bcryptJs.hash(password,salt, async(rror,encryptedPassword)=>{
                const createdUser = await UserModel.create({
                    name,
                    email,
                    username,
                    number,
                    password : encryptedPassword
                });
                // verification code sending process 
                const OTP = getOtp()
                sendOtp(number, OTP);
                const otpObj = await OTPModel.create({
                    otp : OTP,
                    number : number
                })
                // sending response after sending verification code 
                if(createdUser){
                    res.json({
                        message : "Verification has been set to your number!",
                        status : 200,
                        user : createdUser
                    });
                }
            });
        });
    };
    } catch (error) {
       return res.json({
            message : `Internal server error ${error.message}`,
            status : 500
        });
    }
};


// verify phone number by otp function 
const varifyOtp = (req,res)=> {
    const {otp} = req.body;
    
}



module.exports = {registerUser};