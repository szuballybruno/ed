import {Router} from "express";
export const router = Router()

import {getUsers} from "./controllers/GET/getUsers"
import {login} from "./controllers/GET/login"
import {signup} from "./controllers/PUT/signup"
import {deleteUser} from "./controllers/DELETE/deleteUser";
import {updateUser} from "./controllers/PATCH/updateUser";
import {resetUser} from "./controllers/GET/resetUser";
import {getUser} from "./controllers/GET/getUser";
import {updateCurrentItem} from "./controllers/PATCH/updateCurrentItem";
import {updateCurrentCourse} from "./controllers/PATCH/updateCurrentCourse";
import {updateActivity} from "./controllers/PATCH/updateActivity";

router.get('/login', login);

router.get("/", getUsers)
router.post("/", signup)
router.patch("/", updateUser)

router.patch("/activity", updateActivity)

router.get("/:userId", getUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser)

router.patch("/:userId/course/:courseId", updateCurrentCourse)
router.patch("/:userId/course/:courseId/item/:itemId", updateCurrentItem)

router.get("/:userId/reset", resetUser);
