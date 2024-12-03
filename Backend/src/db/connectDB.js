import mongoose from "mongoose";
import { dbName } from "../index.js";

export const connectDB = async () => {
 try {
     const connection =  mongoose.connect(`${process.env.MONGO_DB_URI}/${dbName}`);
   console.log("MongoDB connected");
 } catch (error) {
    console.log(error);
    process.exit(1);
 }
}


