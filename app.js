const env = require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {connectDatabse} = require('./db');
const cors = require('cors')

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

// basic middleware 
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname, "uploads")))

// Routes handler 
const userRoutes = require("./Routes/User.route.js");
const verifyOtp = require("./helpers/sendOtp.js");
const getOtp = require("./helpers/generateOtp.js");
const uploadImage = require("./helpers/multer.js");

//Routes 
app.use('/v1/users', userRoutes);


// database connecting and starting sever 
const PORT = process.env.PORT || 3001
const startApp = ()=>{
    connectDatabse().then(()=> app.listen(PORT,()=> console.log(`Server is listining at ${PORT}`))
)}
startApp()