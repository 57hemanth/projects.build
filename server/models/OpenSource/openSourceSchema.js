import mongoose from "mongoose";

const openSourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advance"],
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
    hostedAt: {
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
}, { timestamps: true });

const OpenSource = mongoose.model("OpenSource", openSourceSchema);

export default OpenSource;