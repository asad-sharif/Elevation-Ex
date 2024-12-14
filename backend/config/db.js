import { response } from "express";
import mongoose from "mongoose";

const db_string = process.env.MONGO_URI

export const connectDB = async () => {
    try {
        if (!db_string) {
            console.log(`Mongodb connection string failure`);
            process.exit(1)
        }
        const conn = await mongoose.connect(db_string)
        console.log(`MogoDB connected at: ${conn.connection.host}`);
    } catch (error) {
        console.log('Failed to connect db - ', error.message);
        process.exit(1)
    }
}