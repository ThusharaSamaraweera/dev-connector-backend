const {app} = require("./app");
const connectDB = require("./config/db");

const start = async () => {
  try {
    // connect mongoDB
    await connectDB();
    
  } catch (error) {
    console.error(error)
  }
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => console.log(`Server v1.1 is running on ${PORT}`));
}

start()