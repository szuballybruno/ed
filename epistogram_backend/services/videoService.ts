import { Video } from "../models/entity/Video";
import { staticProvider } from "../staticProvider";

export const getVideoByIdAsync = (videoId: number) => {

    return staticProvider
        .ormConnection
        .getRepository(Video)
        .findOne(videoId);
}