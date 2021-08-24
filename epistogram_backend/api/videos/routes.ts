import {Router} from "express";
export const router = Router()


import {getVideos} from './controllers/GET/getVideos'
import {getVideo} from "./controllers/GET/getVideo";
import {addToVideo} from "./controllers/addToVideo";
import {editVideo} from "./controllers/editVideo";
import {removeFromVideo} from "./controllers/removeFromVideo";
import {uploadVideoImage} from "./controllers/uploadVideoImage";
import {addOverlayAnswer} from "./controllers/addOverlayAnswer";

router.get('/video/:videoId', getVideo)
router.get('/', getVideos);

router.put('/video/:itemId', addToVideo)
router.put('/video/:itemId/overlay/answer', addOverlayAnswer)
router.patch('/video/:itemId', editVideo)
router.patch('/video/:itemId/remove', removeFromVideo)
router.put('/video/:itemId/image', uploadVideoImage);
