import {Router} from "express"
import {setTask} from "./controllers/PUT/setTask";
export const router = Router()

router.put('/settask', setTask)