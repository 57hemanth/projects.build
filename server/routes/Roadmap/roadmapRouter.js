import express from "express";
import { createRoadmap, getAllRoadmaps, getRoadmapById } from "../../controllers/Roadmap/roadmapCtrl.js";

const roadmapRouter = express.Router();

roadmapRouter.post("/new", createRoadmap);
roadmapRouter.get("/all", getAllRoadmaps);
roadmapRouter.get("/id/:id", getRoadmapById);

export default roadmapRouter;