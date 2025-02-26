const mongoose = require('mongoose');

const connectDatabse = async()=> {
    const MONGODB_URI = process.env.MONGODB_URI;
  await mongoose.connect(MONGODB_URI).then(console.log("Dastabse is connected!")).catch((err)=> console.log(err)
  )
};

module.exports = {connectDatabse};