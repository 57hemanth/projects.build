import User from "../../models/User/userSchema.js";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const findUser = await User.findOne({ email })
        if(findUser){
            res.status(409).json({ message: "User already exits" })
        } else {
            const user = await User.create({ name, email, password });
            res.status(200).json({ message: "User created successfully" });
        }
    } catch(error) {
        res.status(500).json({ message: error.message, error});
    }
}

const loginUser = async (req, res) => {
   const { email, password } = req.body;
   try {
        const user = await User.findOne({ email });
        if(!user){
            res.status(404).json({ message: "User not found" })
        } else {
            const compare = bcyrpt.compareSync(password, user.password)
            if(compare){
                const token = jwt.sign({
                    data: user
                }, process.env.JWT_SECRET, { expiresIn: "7d" });
                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "None",
                    secure: true,
                    expires: new Date(Date.now() + 24 * 3600000),
                });
                res.status(200).json({ message: "Login successful", token });
            } else {
                res.status(400).json({ message: "Invalid credentials" });
            }
        }
   } catch (error) {
        res.status(500).json({ message: error.message, error })
   }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            res.status(404).json({ message: "User not found" });
        } else {
            const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
            res.status(200).json({ message: "User updated", "Updated user": updatedUser });
        }
    } catch(error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            res.status(404).json({ message: "User not found" });
        } else {
            await User.findByIdAndDelete(id);
            res.status(200).json({ message: "User deleted" });
        }
    } catch(error) {
        res.status(500).json({ message: "Something went worng", error });
    }
}

const getProfile = (req, res) => {
    try {
        const getToken = req.headers.cookie;
        if(getToken){
            const token = req.headers.cookie.split("=")[1]
            const verify = jwt.verify(token, process.env.JWT_SECRET)
            if(verify){
                const { name, email, isAdmin, _id } = verify.data
                res.status(200).json({ user: { name, email, isAdmin, id:_id } })
            } else {
                res.status(401).json({ message: "Unauthorized" })
            }
        } else {
            res.status(401).json({ message: "Unauthorized" })
        }
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!", error })
    }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        })
        res.status(200).json({ message: "User logged out"})
    } catch(error){
        res.status(500).json({ message: "Something went worng" })
    }
}

export { createUser, updateUser, deleteUser, loginUser, getProfile, logoutUser }