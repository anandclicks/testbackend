const multer = require('multer');
const path = require("path");
const UserModel = require('../models/User.model');



const storage = multer.diskStorage({
  destination : function(req,res,cb){
    const destination = path.join("uploads");
    cb(null,destination)
  },
  filename : function(req,res,cb){
    const fileName = `${Date.now()}.png`
    cb(null,fileName)
  }
})

const uploadImage = multer({storage});

module.exports = uploadImage;