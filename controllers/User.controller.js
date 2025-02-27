const jsonWenToken = require("jsonwebtoken");
const bcryptJs = require("bcryptjs");

// user model 
const UserModel = require("../models/User.model.js")
// User registration method 
const registerUser = async(req,res)=>{
    // extracting form data 
    const {name,email,username,password,} = req.body
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
        bcryptJs.genSalt(10,async(salt,error)=>{
            bcryptJs.hash(password,salt, async(encryptedPassword, error)=>{
                const createdUser = await UserModel.create({
                    name,
                    email,
                    username,
                    password : encryptedPassword
                });
                if(createdUser){
                    res.json({
                        message : "User has been created!",
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






module.exports = {registerUser};