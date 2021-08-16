import { Router } from "express";
import { getUsersAction } from "./controllers/GET/getUsers"
// import { login } from "./controllers/GET/login"
import { signup } from "./controllers/PUT/signup"
import { deleteUser } from "./controllers/DELETE/deleteUser";
import { updateUser } from "./controllers/PATCH/updateUser";
import { resetUser } from "./controllers/GET/resetUser";
import { getUser } from "./controllers/GET/getUser";
import { updateCurrentItem } from "./controllers/PATCH/updateCurrentItem";
import { updateCurrentCourse } from "./controllers/PATCH/updateCurrentCourse";
import { updateActivityAction } from "./controllers/PATCH/updateActivity";
import { getAsyncActionHandler } from "../../utilities/helpers";

// router.get('/login', login);
export const router = Router()

router.get("/", getAsyncActionHandler(getUsersAction))
router.post("/", signup)
router.patch("/", updateUser)

router.patch("/activity", updateActivityAction)

router.get("/:userId", getUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser)

router.patch("/:userId/course/:courseId", updateCurrentCourse)
router.patch("/:userId/course/:courseId/item/:itemId", updateCurrentItem)

router.get("/:userId/reset", resetUser);