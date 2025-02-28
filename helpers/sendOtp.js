const twilo = require("twilio")(process.env.TWILO_SID,process.env.TWILO_KEY);

const sendOtp = async(number,otp)=> {
    
   try {
   await twilo.messages.create({
        body : `OTP is ${otp}`,
        to : `+91${number}`,
        from : process.env.FROM_NUMBER,
    })

   } catch (error) {
    console.log(error);
    
   }
}

module.exports = sendOtp;