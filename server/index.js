import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import bodyParser from "body-parser";
import projectRouter from "./routes/Project/projectRouter.js";
import userRouter from "./routes/User/userRouter.js";
import ideaRounter from "./routes/Idea/ideaRouter.js";
import templateRouter from "./routes/Template/templateRouter.js";
import roadmapRouter from "./routes/Roadmap/roadmapRouter.js";
import openSourceRouter from "./routes/OpenSource/openSourceRouter.js";
import subscribeRouter from "./routes/Subscribe/subscribeRouter.js";

// Cofigurations
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
// app.use(morgan("dev"));


const PORT = process.env.PORT || 8000;
connectDB();

app.use("/api/project", projectRouter);
app.use("/api/user", userRouter);
app.use("/api/idea", ideaRounter);
app.use("/api/template", templateRouter);
app.use("/api/roadmap", roadmapRouter);
app.use("/api/opensource", openSourceRouter);
app.use("/api/subscribe", subscribeRouter);

app.listen(PORT, () => {
    console.log("Server is running");
})