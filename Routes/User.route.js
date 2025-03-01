const express = require("express");
const Router = express.Router();

const {registerUser, verifyOtp} = require("../controllers/User.controller.js");
const uploadImage = require("../helpers/multer.js");
const userAuthantication = require('../helpers/userAuthenticate.js');
const verifingUser = require("../helpers/verifyingUser.js");

Router.post('/create-user',uploadImage.single('profileImage'),verifingUser, registerUser);
Router.post('/verify-otp',uploadImage.none(),userAuthantication,verifyOtp);

module.exports = Router;