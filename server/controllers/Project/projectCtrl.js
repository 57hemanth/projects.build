import Project from "../../models/Project/projectSchema.js";

const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        if(project){
            res.status(201).json({ message: "Project created", project });
        } else {
            res.status(400).json({ message: "Something went wrong" });
        }
    } catch(error) {
        res.status(500).json({ message: "Something went wrong", error});
    }
}

const getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if(project){
            res.status(200).json({ message: "Project found", project });
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch(error) {
        res.status(500).json({ message: "Something went wrong", error});
    }
}

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).sort({createdAt: -1})
        if(projects){
            res.status(200).json({ message: "Projects found", projects });
        } else {
            res.status(404).json({ message: "Projects not found" });
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", error});
    }
}

const handleLike = async (req, res) => {
    const { id } = req.params
    const { userid } = req.headers
    try{
        const project = await Project.findOne({_id: id})
        if(project){
            const updatedProject = await Project.findByIdAndUpdate({_id: id}, { ...project, likedBy: project.likedBy.push(userid) })
            res.status(200).json({ message: "Project liked" })
        } else {
            res.status(404).json({ message: "Project not found" })
        }
    } catch(error){
        res.status(500).json({ message: "Something went wrong" })
    }
}

const handleDislike = async (req, res) => {
    const { id } = req.params
    const { userid } = req.headers
    try {
        const project = await Project.findOne({ _id: id})
        if(project){
            const updatedLike = project.likedBy.filter((like) => like != userid)
            const updatedProject = await Project.findByIdAndUpdate({_id: id}, { likedBy: updatedLike })
            res.status(200).json({ message: "Project disliked"})
        } else {
            res.status(404).json({ message: "Project not found" })
        }
    } catch(error){
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export { createProject, getAllProjects, getProjectById, handleLike, handleDislike }