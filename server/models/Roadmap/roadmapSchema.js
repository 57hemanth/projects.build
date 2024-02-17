import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ]
}, { timestamps: true });

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;