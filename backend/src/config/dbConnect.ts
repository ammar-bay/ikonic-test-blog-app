import mongoose from "mongoose";

const DB = process.env.DB_URL as string;

const connectDB = () => {
  try {
    mongoose.connect(DB);
  } catch (err) {
    console.log("Could not connect to DB");
    console.error(err);
  }
};

export default connectDB;
