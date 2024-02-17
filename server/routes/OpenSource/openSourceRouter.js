import express from "express";
import { createOpenSource, getAllOpenSources, getOpenSourceById, handleDislike, handleLike } from "../../controllers/OpenSource/openSourceCtrl.js";

const openSourceRouter = express.Router();

openSourceRouter.post("/new", createOpenSource);
openSourceRouter.get("/all", getAllOpenSources);
openSourceRouter.get("/id/:id", getOpenSourceById);
openSourceRouter.post("/like/:id", handleLike);
openSourceRouter.post("/dislike/:id", handleDislike);

export default openSourceRouter;