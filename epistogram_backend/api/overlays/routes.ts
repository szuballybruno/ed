import {Router} from "express";
import {uploadOverlay} from "./controllers/uploadOverlay";
export const router = Router()

router.post('/', uploadOverlay);

//router.get('/overlay/:overlayId', uploadOverlay)
/*router.get('/', getVideos);

router.put('/video/:itemId', addToVideo)
router.put('/video/:itemId/overlay/answer', addOverlayAnswer)
router.patch('/video/:itemId', editVideo)
router.patch('/video/:itemId/remove', removeFromVideo)

router.put('/video/:itemId/image', uploadVideoImage);*/