import { Router } from "express";
import { getAsyncActionHandler } from "../../utilities/helpers";
// import { login } from "./controllers/GET/login"
import { deleteUser } from "./controllers/DELETE/deleteUser";
import { resetUserPasswordAction } from "./controllers/GET/resetUserPasswordAction";
import { updateActivityAction } from "./controllers/PATCH/updateActivity";
// import { updateCurrentItem } from "./controllers/PATCH/updateCurrentItem";
import { updateCurrentCourse } from "./controllers/PATCH/updateCurrentCourse";
import { updateUser } from "./controllers/PATCH/updateUser";

// router.get('/login', login);
export const router = Router()

router.patch("/activity", updateActivityAction);

// router.get("/:userId", getUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

router.patch("/:userId/course/:courseId", updateCurrentCourse);
// router.patch("/:userId/course/:courseId/item/:itemId", updateCurrentItem);

router.get("/:userId/reset", getAsyncActionHandler(resetUserPasswordAction));