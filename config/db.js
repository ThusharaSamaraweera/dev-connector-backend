const mongoose = require('mongoose')

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected');
  }catch(err){
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
} 

module.exports = connectDB;