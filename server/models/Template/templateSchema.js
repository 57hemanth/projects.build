import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    techStack: {
        type: [String],
        required: true
    },
    link: {
        type: String,
        required: true
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
}, { timestamps: true });

const Template = mongoose.model("Template", templateSchema);

export default Template;