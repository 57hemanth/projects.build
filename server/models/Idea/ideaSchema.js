import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
}, { timestamps: true });

const Idea = mongoose.model("Idea", ideaSchema);

export default Idea;