const express = require("express");
const Router = express.Router();

const {registerUser, verifyOtp, userLogin, resendOtp} = require("../controllers/User.controller.js");
const uploadImage = require("../helpers/multer.js");
const userAuthantication = require('../helpers/userAuthenticate.js');
const verifingUser = require("../helpers/verifyingUser.js");
const isVarifiedUser = require("../helpers/isValidedUser.js");
const { handleFollowUnfollowLogic } = require("../controllers/followUnfollow.controller.js");

Router.post('/create-user',uploadImage.single('profileImage'),verifingUser, registerUser);
Router.post('/verify-otp',uploadImage.none(),userAuthantication,verifyOtp);
Router.post('/user-login',uploadImage.none(),isVarifiedUser,userLogin);
Router.post('/resend-otp',uploadImage.none(),userAuthantication,resendOtp);
Router.post('/follow-unfollow',uploadImage.none(),userAuthantication, handleFollowUnfollowLogic);

module.exports = Router;