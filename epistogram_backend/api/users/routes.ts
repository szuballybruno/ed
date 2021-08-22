import { Router } from "express";
import { getUsersAction } from "./controllers/GET/getUsers"
// import { login } from "./controllers/GET/login"
import { deleteUser } from "./controllers/DELETE/deleteUser";
import { updateUser } from "./controllers/PATCH/updateUser";
import { resetUserPasswordAction } from "./controllers/GET/resetUserPasswordAction";
import { getUser } from "./controllers/GET/getUser";
import { updateCurrentItem } from "./controllers/PATCH/updateCurrentItem";
import { updateCurrentCourse } from "./controllers/PATCH/updateCurrentCourse";
import { updateActivityAction } from "./controllers/PATCH/updateActivity";
import { getAsyncActionHandler } from "../../utilities/helpers";
import { createInvitedUserAction } from "./userManagementActions";

// router.get('/login', login);
export const router = Router()

router.get("/", getAsyncActionHandler(getUsersAction))
router.post("/create-invited-user", getAsyncActionHandler(createInvitedUserAction))
router.post("/finalize-user-registration", updateUser)

router.patch("/activity", updateActivityAction)

router.get("/:userId", getUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser)

router.patch("/:userId/course/:courseId", updateCurrentCourse)
router.patch("/:userId/course/:courseId/item/:itemId", updateCurrentItem)

router.get("/:userId/reset", getAsyncActionHandler(resetUserPasswordAction));