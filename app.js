const env = require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const {connectDatabse} = require('./db');

// basic middleware 
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/uploads',express.static(path.join(__dirname, "uploads")))

// Routes handler 
const userRoutes = require("./Routes/User.route.js");
const verifyOtp = require("./helpers/sendOtp.js");
const getOtp = require("./helpers/generateOtp.js");
const uploadImage = require("./helpers/multer.js");

//Routes 
app.use('/v1/users', userRoutes);
app.post('/image',uploadImage.single('profileImage'),(req,res)=> {
    res.json({
        message : "Image has uploaded succesfully!",
        url : `${process.env.BASEURL}uploads/${req.file.filename}`
    })
})

// database connecting and starting sever 
const PORT = process.env.PORT || 3001
const startApp = ()=>{
    connectDatabse().then(()=> app.listen(PORT,()=> console.log(`Server is listining at ${PORT}`))
)}
startApp()