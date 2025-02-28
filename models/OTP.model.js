const mongoose = require("mongoose");

const OTPModel = mongoose.Schema({
    otp : {
        type : String,
        required : true
    },
    number : {
        type : Number,
        required : true
    }
},
{
    timestamps : true,
}
)

module.exports = mongoose.model("OTPModel", OTPModel);