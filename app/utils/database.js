import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://tadasy:vRkRDI2l8Fruggnr@cluster0.n56zy.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
        throw new Error("MongoDB Connection Failed");
    }
};

export default connectDB;