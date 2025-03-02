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
OTPModel.index({createdAt:1}, {expireAfterSeconds: 60})

module.exports = mongoose.model("OTPModel", OTPModel);