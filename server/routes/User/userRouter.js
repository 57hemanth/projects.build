import express from "express";
import { createUser, deleteUser, getProfile, loginUser, logoutUser, updateUser } from "../../controllers/User/userCtrl.js";

const userRouter = express.Router();

userRouter.post("/new", createUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginUser);
userRouter.post("/auth", getProfile);
userRouter.post("/logout", logoutUser);

export default userRouter;