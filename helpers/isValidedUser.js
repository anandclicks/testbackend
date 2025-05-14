const UserModel = require("../models/User.model")

const isVarifiedUser = async(req,res,next)=> {
    const {number} = req.body
    console.log(req.body);
    
 // checking is user a verified user
 const userForLoginProcess = await UserModel.findOne({number})
 console.log(userForLoginProcess);
 
 if(!userForLoginProcess){
    return res.json({
        message : "User not found!",
        status : 404
    });
 }
//  const isVarified = userForLoginProcess.varified
//  if(!isVarified){
//     return res.json({
//         message : "Please verifiy your mobile number!",
//         status : 405
//     });
//  };
 req.userForLoginProcess = userForLoginProcess
 next();
}

module.exports = isVarifiedUser;