import { User } from "../models/entity/User";
import { IdType } from "../models/shared_models/types/sharedTypes";
import { VideoDTO } from "../models/shared_models/VideoDTO";
import { getTypeORMConnection } from "../server";
import { TypedError } from "../utilities/helpers";
import { getVideoByIdAsync } from "./videoService";

export const setCurrentVideoAsync = async (userId: number, courseId: number, videoId: number) => {

    const video = await getVideoByIdAsync(videoId);
    if (!video)
        throw new TypedError("Video not found by id: " + videoId, "videoNotFound");

    return await getTypeORMConnection()
        .getRepository(User)
        .save({
            id: userId,
            currentVideoId: videoId
        });
}

export const getCurrentVideoAsync = async (userId: number, courseId: IdType, videoId: IdType) => {

    const user = await getTypeORMConnection()
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :userId", { userId: userId })
        .leftJoinAndSelect("user.currentVideo", "video")
        .getOneOrFail();

    const currentVideo = user.currentVideo!;

    return {
        length: currentVideo.length,
        url: currentVideo.url
    } as VideoDTO;
}