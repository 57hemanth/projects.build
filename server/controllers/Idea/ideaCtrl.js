import Idea from "../../models/Idea/ideaSchema.js";

const createIdea = async (req, res) => {
    try {
        const idea = await Idea.create(req.body);
        if(!idea) {
            res.status(400).json({ message: "Something went wrong" });
        } else {
            res.status(200).json({ message: "Idea created", idea });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getAllIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find();
        if(!ideas) {
            res.status(404).json({ message: "No ideas found" });
        } else {
            res.status(200).json({ message: "Ideas found", ideas});
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getIdeaById = async (req, res) => {
    const { id } = req.params;
    try {
        const idea = await Idea.findById(id);
        if(!idea) {
            res.status(404).json({ message: "Idea not found" });
        } else {
            res.status(200).json({ message: "Idea found", idea});
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const handleLike = async (req, res) => {
    const { id } = req.params
    const { userid } = req.headers
    try{
        const idea = await Idea.findOne({_id: id})
        if(idea){
            const updatedIdea = await Idea.findByIdAndUpdate({_id: id}, { ...idea, likedBy: idea.likedBy.push(userid) })
            res.status(200).json({ message: "Idea liked" })
        } else {
            res.status(404).json({ message: "Idea not found" })
        }
    } catch(error){
        res.status(500).json({ message: "Something went wrong" })
    }
}

const handleDislike = async (req, res) => {
    const { id } = req.params
    const { userid } = req.headers
    try {
        const idea = await Idea.findOne({ _id: id})
        if(idea){
            const updatedLike = idea.likedBy.filter((like) => like != userid)
            const updatedIdea = await Idea.findByIdAndUpdate({_id: id}, { likedBy: updatedLike })
            res.status(200).json({ message: "Idea disliked"})
        } else {
            res.status(404).json({ message: "Idea not found" })
        }
    } catch(error){
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export { createIdea, getAllIdeas, getIdeaById, handleDislike, handleLike }