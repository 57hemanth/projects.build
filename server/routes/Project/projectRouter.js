import express from "express";
import { createProject, getAllProjects, getProjectById, handleDislike, handleLike } from "../../controllers/Project/projectCtrl.js";

const projectRouter = express.Router();

projectRouter.post("/new", createProject);
projectRouter.get("/id/:id", getProjectById);
projectRouter.get("/all", getAllProjects);
projectRouter.post("/like/:id", handleLike);
projectRouter.post("/dislike/:id", handleDislike);

export default projectRouter;