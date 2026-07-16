import mongoose, { mongo } from "mongoose";

export async function connectDB(params) {
    try{
        const mongoUri = process.env.MONGO_URI 
        if(!mongoUri){
            throw new Error("MONGO_URI is required")
        }
        const conn = await mongoose.connect(mongoUri);
        console.log("mongoDB connected:" , conn.connection.host);
    }
    catch(error){
        console.log("mongoDB connection error:" , error.message);
        process.exit(1);
    }
}