import {Router} from "express";
import {getTags} from "./controllers/getTags";
import {updateTag} from "./controllers/updateTag";
import {deleteTag} from "./controllers/deleteTag";
export const router = Router()

router.get('/', getTags)
router.patch("/", updateTag)
/*
router.get("/:tagId", getTag)
router.patch("/:tagId", editTag);*/
router.delete("/:tagId", deleteTag)

