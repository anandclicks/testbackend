const express = require("express");
const Router = express.Router();

const {registerUser, verifyOtp, userLogin, resendOtp} = require("../controllers/User.controller.js");
const uploadImage = require("../helpers/multer.js");
const userAuthantication = require('../helpers/userAuthenticate.js');
const verifingUser = require("../helpers/verifyingUser.js");
const isVarifiedUser = require("../helpers/isValidedUser.js");
const { handleFollowUnfollowLogic } = require("../controllers/followUnfollow.controller.js");

Router.post('/register',uploadImage.single('profileImage'),verifingUser, registerUser);
Router.post('/login',uploadImage.none(),userLogin);
Router.post('/follow-unfollow',uploadImage.none(),userAuthantication, handleFollowUnfollowLogic);


module.exports = Router;