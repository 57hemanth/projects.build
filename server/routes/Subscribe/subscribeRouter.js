import express from "express"
import { addSubscriber } from "../../controllers/Subscribe/subscribeCtrl.js"

const subscribeRouter = express.Router()

subscribeRouter.post("/add", addSubscriber)

export default subscribeRouter