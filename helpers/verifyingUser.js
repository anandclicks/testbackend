const UserModel = require("../models/User.model");

const  verifingUser = async(req,res,next)=> {
  const {email,number} = req.body
  console.log(email,number);
  
    // checking for user existance 
      const isExist = await UserModel.findOne({$or: [
          {email},
          {number}
      ]});

      
      if(isExist){
          return res.json({
              message : "User with this email or number already exist! please use a diffrent one!",
              status : 409,
          });
        }
      next()

}

module.exports = verifingUser