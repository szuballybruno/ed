import {Router} from "express";
export const router = Router()

import {uploadAvatarImage} from "./controllers/uploadAvatarImage";
import {uploadThumbnailImage} from "./controllers/uploadThumbnailImage"
import {uploadVoteImages} from "./controllers/uploadVoteImages"

router.post('/uploadavatar', uploadAvatarImage)
router.post('/uploadthumbnail', uploadThumbnailImage)
router.post('/uploadvotes', uploadVoteImages)
