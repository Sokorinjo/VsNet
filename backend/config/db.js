import mongoose from "mongoose";

const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`~~MongoDB Connected: ${conn.connection.host}`.green)
  }catch(error){
    console.error(`MongoDB Error: ${error.message}`.red)
  }
}


export default connectDB