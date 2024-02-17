import Roadmap from "../../models/Roadmap/roadmapSchema.js"

const createRoadmap = async (req, res) => {
    try {
        const roadmap = await Roadmap.create(req.body);
        if(!roadmap){
            res.status(400).json({ message: "Roadmap is not created" });
        } else {
            res.status(200).json({ message: "Roadmap created", roadmap});
        }
    } catch(error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

const getAllRoadmaps = async (req, res) => {
    try {
        const roadmaps = await Roadmap.find();
        if(!roadmaps) {
            res.status(404).json({ message: "Roadmaps not found" });
        } else {
            res.status(200).json({ message: "Roadmaps found", roadmaps });
        }
    } catch(error) {
        res.status(500).json({ message: "Something went worng", error})
    }
}

const getRoadmapById = async (req, res) => {
    const { id } = req.params;
    try {
        const roadmap = await Roadmap.findOne({ _id: id }).populate({ path: "path" })
        if(!roadmap) {
            res.status(404).json({ message: "Roadmap is not found" });
        } else {
            res.status(200).json({ message: "Roadmap found", roadmap })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", error })
    }
}

export { createRoadmap, getAllRoadmaps, getRoadmapById }
