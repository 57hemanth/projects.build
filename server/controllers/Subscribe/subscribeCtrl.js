import Subscribe from "../../models/Subscribe/subscribe.js"


const addSubscriber = async (req, res) => {
    try{
        const subscriber = await Subscribe.create(req.body)
        if(subscriber){
            res.status(200).json({ message: "Subscibed" })
        } else {
            res.status(400).json({ message: "Not subscribed" });
        }
    } catch(error){
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export { addSubscriber }