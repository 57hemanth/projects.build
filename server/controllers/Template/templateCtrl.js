import Template from "../../models/Template/templateSchema.js"

const createTemplate = async (req, res) => {
    try {
        const template = await Template.create(req.body);
        if(!template){
            res.status(400).json({ message: "Failed to create project" });
        } else {
            res.status(200).json({ message: "Template created", template});
        }
    } catch(error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

const getTemplateById = async (req, res) => {
    const { id } = req.params;
    try {
        const template = await Template.findById(id);
        if(!template){
            res.status(404).json({ message: "Template not found" });
        } else {
            res.status(200).json({ message: "Template found", template});
        }
    } catch(error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

const getAllTemplates = async (req, res) => {
    try {
        const templates = await Template.find();
        if(!templates){
            res.status(404).json({ message: "Templates not found" })
        } else {
            res.status(200).json({ message: "All templates", templates })
        }
    } catch(error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const handleLike = async (req, res) => {
    const { id } = req.params
    const { userid } = req.headers
    try{
        const template = await Template.findOne({_id: id})
        if(template){
            const updatedTemplate = await Template.findByIdAndUpdate({_id: id}, { ...template, likedBy: template.likedBy.push(userid) })
            res.status(200).json({ message: "Template liked" })
        } else {
            res.status(404).json({ message: "Template not found" })
        }
    } catch(error){
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const handleDislike = async (req, res) => {
    const { id } = req.params
    const { userid } = req.headers
    try {
        const template = await Template.findOne({ _id: id})
        if(template){
            const updatedLike = template.likedBy.filter((like) => like != userid)
            const updatedTemplate = await Template.findByIdAndUpdate({_id: id}, { likedBy: updatedLike })
            res.status(200).json({ message: "Template disliked"})
        } else {
            res.status(404).json({ message: "Template not found" })
        }
    } catch(error){
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export { createTemplate, getAllTemplates, getTemplateById, handleDislike, handleLike }