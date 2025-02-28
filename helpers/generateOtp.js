const getOtp = () => {
    try {
        let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 9);
    }
    return otp;
    } catch (error) {
        throw error;
    }
  };
  module.exports = getOtp;