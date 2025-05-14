const express = require('express')
const Router = express.Router()

const {createPost} = require("../controllers/Post.controller")
const uploadImage = require("../helpers/multer")

Router.post("/create",uploadImage.single("image"),createPost)

module.exports = Router