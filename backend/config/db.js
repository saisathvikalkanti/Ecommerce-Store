import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGO DB CONNECTED`);
    }catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}