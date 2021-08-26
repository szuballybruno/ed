import { Video } from "../models/entity/Video";
import { getTypeORMConnection } from "../database"

export const getVideoByIdAsync = (videoId: number) => {

    return getTypeORMConnection()
        .getRepository(Video)
        .findOne(videoId);
}