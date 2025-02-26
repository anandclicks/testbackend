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
    required: [true, "Email is reuqired!"],
    unique: [true, "Email already exist! use a diffent one!"],
    min: [3, "Email is not valide!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    min: [3, "username is too short"],
    max: [10, "Username is too long!"],
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "postModel",
    },
  ],
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: "userModel",
    },
  ],
  followers: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
      },
    ],
  },
});


module.exports = mongoose.model("userModel", userSchema)