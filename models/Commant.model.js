const mongoose = require("mongoose");
const commentModel = mongoose.Schema({
    comment: {
      type: String,
      required: true,
    },
    commentedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    }},
  {timestamps: true,}
);

module.exports = mongoose.model("commantModel", commentModel);