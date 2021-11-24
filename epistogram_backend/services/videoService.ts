import { AnswerSession } from "../models/entity/AnswerSession";
import { Question } from "../models/entity/Question";
import { StorageFile } from "../models/entity/StorageFile";
import { Video } from "../models/entity/Video";
import { VideoPlaybackData } from "../models/entity/VideoPlaybackData";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { staticProvider } from "../staticProvider";
import { unsetUsersCurrentCourseItemAsync } from "./courseService";
import { getFilePath, uploadAssigendFileAsync } from "./fileService";
import { log } from "./misc/logger";
import { getAssetUrl } from "./misc/urlProvider";
import { getVideoLengthSecondsAsync } from "./misc/videoDurationService";
import { answerQuestionAsync } from "./questionAnswerService";
import { deleteQuesitonsAsync } from "./questionService";

export const answerVideoQuestionAsync = async (answerSessionId: number, questionId: number, answerIds: number[]) => {

    // validation comes here

    return answerQuestionAsync(answerSessionId, questionId, answerIds);
}

export const insertVideoAsync = async (video: Video, filePath?: string) => {

    if (video.id)
        throw new Error("Cannot insert with id!");

    if (filePath) {
        const videoFileUrl = getAssetUrl(filePath)!;

        video.videoFile = {
            filePath: filePath
        } as StorageFile;

        video.lengthSeconds = await getVideoLengthSecondsAsync(videoFileUrl);
    }
    else {

        video.lengthSeconds = 0;
    }

    await staticProvider
        .ormConnection
        .getRepository(Video)
        .save(video);
}

export const setVideoFileIdAsync = async (videoId: number, videoFileId: number) => {

    await staticProvider
        .ormConnection
        .getRepository(Video)
        .save({
            id: videoId,
            videoFileId: videoFileId
        });
}

export const saveVideoPlaybackDataAsync = async (
    userId: number, videoId: number, watchedPercent: number, isWatched: boolean) => {

    const repo = staticProvider
        .ormConnection
        .getRepository(VideoPlaybackData);

    const pbd = await repo
        .findOne({
            videoId: videoId,
            userId: userId
        });

    const videoPlaybackData = {
        id: pbd?.id,
        userId: userId,
        videoId: videoId,
        watchedPercent: watchedPercent,
        isWatched: isWatched
    } as VideoPlaybackData;

    log("Saving video playback data:");
    log(videoPlaybackData);

    await repo
        .save(videoPlaybackData);
}

export const deleteVideosAsync = async (videoIds: number[], unsetCurrentCourseItem: boolean) => {

    if (videoIds.length === 0)
        return;

    // delete questions
    const questions = await staticProvider
        .ormConnection
        .getRepository(Question)
        .createQueryBuilder("q")
        .where('"video_id" IN (:...videoIds)', { videoIds })
        .getMany();

    await deleteQuesitonsAsync(questions.map(x => x.id));

    // delete answer sessions
    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(AnswerSession)
        .where('"video_id" IN (:...videoIds)', { videoIds })
        .execute();

    // set current course item on users
    if (unsetCurrentCourseItem) {
        for (let index = 0; index < videoIds.length; index++) {

            const videoId = videoIds[index];
            await unsetUsersCurrentCourseItemAsync(undefined, videoId);
        }
    }

    // delete playback samples 
    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(VideoPlaybackSample)
        .where('"video_id" IN (:...videoIds)', { videoIds })
        .execute();

    // delete playback samples 
    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(VideoPlaybackData)
        .where('"video_id" IN (:...videoIds)', { videoIds })
        .execute();

    // delete video
    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(Video)
        .where("id IN (:...videoIds)", { videoIds })
        .execute();
}

export const uploadVideoFileAsync = async (videoId: number, videoFileBuffer: Buffer) => {

    // upload file
    const filePath = getFilePath("videos", "video", videoId, "mp4");

    await uploadAssigendFileAsync<Video>(
        filePath,
        () => getVideoByIdAsync(videoId),
        (fileId) => setVideoFileIdAsync(videoId, fileId),
        (entity) => entity.videoFileId,
        videoFileBuffer);

    // set video length
    const videoFileUrl = getAssetUrl(filePath);
    const lengthSeconds = await getVideoLengthSecondsAsync(videoFileUrl);

    await staticProvider
        .ormConnection
        .getRepository(Video)
        .save({
            id: videoId,
            lengthSeconds: lengthSeconds
        })
}

export const getVideoPlaybackData = async (userId: number, videoId: number) => {

    return staticProvider
        .ormConnection
        .getRepository(VideoPlaybackData)
        .findOne({
            videoId: videoId,
            userId: userId
        });
}

export const setVideoThumbnailFileId = async (videoId: number, thumbnailFileId: number) => {

    await staticProvider
        .ormConnection
        .getRepository(Video)
        .save({
            id: videoId,
            thumbnailFileId: thumbnailFileId
        });
}

export const getVideoByIdAsync = async (videoId: number) => {

    const video = await staticProvider
        .ormConnection
        .getRepository(Video)
        .createQueryBuilder("v")
        .where("v.id = :videoId", { videoId })
        .leftJoinAndSelect("v.videoFile", "vf")
        .leftJoinAndSelect("v.questions", "q")
        .leftJoinAndSelect("q.answers", "a")
        .getOneOrFail();

    return video;
}