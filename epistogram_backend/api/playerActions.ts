import { Request } from "express";
import { getUserIdFromRequest } from "../services/authentication";
import { getCurrentVideoAsync, setCurrentVideoAsync } from "../services/playerService";
import { withValueOrBadRequest } from "../utilities/helpers";

export const setCurrentVideoAction = (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const courseId = withValueOrBadRequest(req.body.courseId);
    const videoId = withValueOrBadRequest(req.body.videoId);

    return setCurrentVideoAsync(userId, courseId, videoId);
}

export const getCurrentVideoAction = (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const courseId = withValueOrBadRequest(req.query.courseId);
    const videoId = withValueOrBadRequest(req.query.videoId);

    return getCurrentVideoAsync(userId, courseId, videoId);
}