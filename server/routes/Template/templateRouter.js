import express from "express";
import { createTemplate, getAllTemplates, getTemplateById, handleDislike, handleLike } from "../../controllers/Template/templateCtrl.js";

const templateRouter = express.Router();

templateRouter.post("/new", createTemplate);
templateRouter.get("/all", getAllTemplates);
templateRouter.get("/id/:id", getTemplateById);
templateRouter.post("/like/:id", handleLike);
templateRouter.post("/dislike/:id", handleDislike);

export default templateRouter;