import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
    videoLinks: {
        type: [String],
        required: true
    },
    createdBy: {
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;