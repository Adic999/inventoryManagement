import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log(`CONNECTED TO DATABASE ${response.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectToDatabase;
