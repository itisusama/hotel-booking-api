import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {console.log("MongoDB connection successful");})
        await mongoose.connect(`${process.env.MONGO_URI}/hotel-booking`);
    } catch (error) {
        log.error("Error connecting to MongoDB:", error.message);
    }
}

export default connectDB;