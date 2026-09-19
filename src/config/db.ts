import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if(!mongoURI) {
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(mongoURI);

        console.log("MongoDB is connected successfully");
    } catch (error) {
        console.error("Database is connection error", error);
        process.exit(1);
    }
}

export default connectDB;