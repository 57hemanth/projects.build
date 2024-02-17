import express from "express";
import { createIdea, getAllIdeas, getIdeaById, handleDislike, handleLike } from "../../controllers/Idea/ideaCtrl.js";


const ideaRounter = express.Router();

ideaRounter.post("/new", createIdea);
ideaRounter.get("/all", getAllIdeas);
ideaRounter.get("/id/:id", getIdeaById);
ideaRounter.post("/like/:id", handleLike);
ideaRounter.post("/dislike/:id", handleDislike);

export default ideaRounter;