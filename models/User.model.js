const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    min: [3, "Name is too short!"],
    max: [55, "Name is too long!"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min:true,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 10,
  },
  password : {
    type : String,
    required : true,
  },
  number : {
    type : Number,
    required : true
  },
  varified : {
    type : Boolean,
    default : false
  },
  profileImage : {
    type : String,
    default : '/public/uploads/defaultProfile.png'
  },
  posts: [{
      type: mongoose.Types.ObjectId,
      ref: "postModel",
    }],
  following: [{
      type: mongoose.Types.ObjectId,
      ref: "userModel",
    }],
  followers: [{
      type: mongoose.Types.ObjectId,
      ref: "userModel",
    }],
},
{timestamps : true,}
);


module.exports = mongoose.model("userModel", userSchema)