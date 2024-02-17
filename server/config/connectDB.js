import mongoose from "mongoose";

const connectDB = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODBURI);
        if(conn){
            console.log("Database connection is successful");
        }
    } catch ( error ) {
        console.log("Error while connecting the database. " + error)
    }
}

export default connectDB