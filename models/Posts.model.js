const mongoose = require("mongoose");

const postModel = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    imageUrl : {
        type : String,
    },
    caption : {
        type : String,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "commantModel"
      }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      }],
  },
  {timestamps: true}
);

module.exports = mongoose.model("PostModel", postModel);