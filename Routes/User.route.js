const express = require("express");
const Router = express.Router();

const {registerUser, verifyOtp} = require("../controllers/User.controller.js");
const uploadImage = require("../helpers/multer.js");
const userAuthantication = require('../helpers/userAuthenticate.js')

Router.post('/create-user',uploadImage.single('profileImage'), registerUser);
Router.post('/verify-otp',uploadImage.none(),userAuthantication,verifyOtp);

module.exports = Router;