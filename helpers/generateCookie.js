const jsonwebtoken = require("jsonwebtoken")

const generateCookie = (email)=> {
   const cookie = jsonwebtoken.sign({email : email},process.env.JWT_SECREAT)
   return cookie
};

module.exports = generateCookie