const env = require("dotenv").config();
const express = require('express');
const app = express();
const {connectDatabse} = require('./db');
const UserModel = require("./models/User.model");

// Basic route setup 
app.get('/',(req,res)=> {
    res.json({
        'message' : "working",
        'status' : 200
    })
})


// database connecting and starting sever 
const PORT = process.env.PORT || 3001

const startApp = ()=>{
    connectDatabse()
    app.listen(PORT,()=> {
        console.log(`app is listning at ${PORT}`);
        
    })
}
startApp()