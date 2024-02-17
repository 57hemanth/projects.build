import OpenSource from "../../models/OpenSource/openSourceSchema.js"

const createOpenSource = async (req, res) => {
    try {
        const openSource = await OpenSource.create(req.body);
        if(!openSource) {
            res.status(400).json({ message: "Unable to create"});
        } else {
            res.status(200).json({ message: "Created successfully", openSource});
        }
    } catch(error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getAllOpenSources = async (req, res) => {
    try {
        const openSources = await OpenSource.find();
        if(!openSources){
            res.status(404).json({ message: "No open source posts found" });
        } else {
            res.status(200).json({ message: "Open Source posts found", openSources });
        }

    } catch(error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getOpenSourceById = async (req, res) => {
    const { id } = req.params;
    try {
        const openSource = await OpenSource.findById(id);
        if(!openSource){
            res.status(404).json({ message: "No open source found" });
        } else {
            res.status(200).json({ message: "Found Open source", openSource });
        }
    } catch(error) {
        res.status(500).json({ message: "Something went wrong", error })
    }
}

const handleLike = async (req, res) => {
    const { id } = req.params
    const { userid } = req.headers
    try{
        const openSource = await OpenSource.findOne({_id: id})
        if(openSource){
            const updatedProject = await OpenSource.findByIdAndUpdate({_id: id}, { ...openSource, likedBy: openSource.likedBy.push(userid) })
            res.status(200).json({ message: "OpenSource post liked" })
        } else {
            res.status(404).json({ message: "OpenSource post not found" })
        }
    } catch(error){
        res.status(500).json({ message: "Something went wrong" })
    }
}

const handleDislike = async (req, res) => {
    const { id } = req.params
    const { userid } = req.headers
    try {
        const openSource = await OpenSource.findOne({ _id: id})
        if(openSource){
            const updatedLike = openSource.likedBy.filter((like) => like != userid)
            const updatedOpenSource = await OpenSource.findByIdAndUpdate({_id: id}, { likedBy: updatedLike })
            res.status(200).json({ message: "OpenSource post disliked"})
        } else {
            res.status(404).json({ message: "OpenSource not found" })
        }
    } catch(error){
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export { createOpenSource, getAllOpenSources, getOpenSourceById, handleLike, handleDislike }