const express = require("express");
const Router = express.Router();

const {registerUser} = require("../controllers/User.controller.js")

Router.post('/create', registerUser);

module.exports = Router;