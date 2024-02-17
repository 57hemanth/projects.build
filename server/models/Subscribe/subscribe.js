import mongoose from "mongoose"

const subscribeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Subscribe = mongoose.model("Subscribe", subscribeSchema)

export default Subscribe