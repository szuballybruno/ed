import { AnswerSession } from "../models/entity/AnswerSession";
import { Question } from "../models/entity/Question";
import { StorageFile } from "../models/entity/StorageFile";
import { Video } from "../models/entity/Video";
import { VideoPlaybackData } from "../models/entity/VideoPlaybackData";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { FileService } from "./FileService";
import { log } from "./misc/logger";
import { UrlService } from "./UrlService";
import { getVideoLengthSecondsAsync } from "./misc/videoDurationService";
import { QuestionAnswerService } from "./QuestionAnswerService";
import { QuestionService } from "./QuestionService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";

export class VideoService {

    private _userCourseBridgeService: UserCourseBridgeService;
    private _ormConnection: ORMConnectionService;
    private _questionAnswerService: QuestionAnswerService;
    private _fileService: FileService;
    private _questionsService: QuestionService;
    private _assetUrlService: UrlService;

    constructor(
        ormConnection: ORMConnectionService,
        userCourseBridgeService: UserCourseBridgeService,
        questionAnswerService: QuestionAnswerService,
        fileService: FileService,
        questionsService: QuestionService,
        assetUrlService: UrlService) {

        this._ormConnection = ormConnection;
        this._questionAnswerService = questionAnswerService;
        this._userCourseBridgeService = userCourseBridgeService;
        this._fileService = fileService;
        this._questionsService = questionsService;
        this._assetUrlService = assetUrlService;
    }

    answerVideoQuestionAsync = async (
        userId: number,
        answerSessionId: number,
        questionId: number,
        answerIds: number[],
        elapsedSeconds?: number) => {

        // validation comes here

        return this._questionAnswerService
            .answerQuestionAsync(userId, answerSessionId, questionId, answerIds, false, elapsedSeconds);
    }

    insertVideoAsync = async (video: Video, filePath?: string) => {

        if (video.id)
            throw new Error("Cannot insert with id!");

        if (filePath) {
            const videoFileUrl = this._assetUrlService
                .getAssetUrl(filePath)!;

            video.videoFile = {
                filePath: filePath
            } as StorageFile;

            video.lengthSeconds = await getVideoLengthSecondsAsync(videoFileUrl);
        }
        else {

            video.lengthSeconds = 0;
        }

        await this._ormConnection
            .getRepository(Video)
            .save(video);
    }

    setVideoFileIdAsync = async (videoId: number, videoFileId: number) => {

        await this._ormConnection
            .getRepository(Video)
            .save({
                id: videoId,
                videoFileId: videoFileId
            });
    }

    saveVideoPlaybackDataAsync = async (
        userId: number, videoId: number, watchedPercent: number, isWatched: boolean) => {

        const repo = this._ormConnection
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

    deleteVideosAsync = async (videoIds: number[], unsetCurrentCourseItem: boolean) => {

        if (videoIds.length === 0)
            return;

        // delete questions
        const questions = await this._ormConnection
            .getRepository(Question)
            .createQueryBuilder("q")
            .where('"video_id" IN (:...videoIds)', { videoIds })
            .getMany();

        await this._questionsService
            .deleteQuesitonsAsync(questions.map(x => x.id));

        // delete answer sessions
        await this._ormConnection
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(AnswerSession)
            .where('"video_id" IN (:...videoIds)', { videoIds })
            .execute();

        // set current course item on users
        if (unsetCurrentCourseItem) {
            for (let index = 0; index < videoIds.length; index++) {

                const videoId = videoIds[index];
                await this._userCourseBridgeService
                    .unsetUsersCurrentCourseItemAsync(undefined, videoId);
            }
        }

        // delete playback samples 
        await this._ormConnection
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(VideoPlaybackSample)
            .where('"video_id" IN (:...videoIds)', { videoIds })
            .execute();

        // delete playback samples 
        await this._ormConnection
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(VideoPlaybackData)
            .where('"video_id" IN (:...videoIds)', { videoIds })
            .execute();

        // delete video
        await this._ormConnection
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(Video)
            .where("id IN (:...videoIds)", { videoIds })
            .execute();
    }

    uploadVideoFileAsync = async (videoId: number, videoFileBuffer: Buffer) => {

        // upload file
        const filePath = this._fileService
            .getFilePath("videos", "video", videoId, "mp4");

        await this._fileService
            .uploadAssigendFileAsync<Video>(
                filePath,
                () => this.getVideoByIdAsync(videoId),
                (fileId) => this.setVideoFileIdAsync(videoId, fileId),
                (entity) => entity.videoFileId,
                videoFileBuffer);

        // set video length
        const videoFileUrl = this._assetUrlService
            .getAssetUrl(filePath);

        const lengthSeconds = await getVideoLengthSecondsAsync(videoFileUrl);

        await this._ormConnection
            .getRepository(Video)
            .save({
                id: videoId,
                lengthSeconds: lengthSeconds
            })
    }

    getVideoPlaybackData = async (userId: number, videoId: number) => {

        return this._ormConnection
            .getRepository(VideoPlaybackData)
            .findOne({
                videoId: videoId,
                userId: userId
            });
    }

    setVideoThumbnailFileId = async (videoId: number, thumbnailFileId: number) => {

        await this._ormConnection
            .getRepository(Video)
            .save({
                id: videoId,
                thumbnailFileId: thumbnailFileId
            });
    }

    getVideoByIdAsync = async (videoId: number) => {

        const video = await this._ormConnection
            .getRepository(Video)
            .createQueryBuilder("v")
            .where("v.id = :videoId", { videoId })
            .leftJoinAndSelect("v.videoFile", "vf")
            .leftJoinAndSelect("v.questions", "q")
            .leftJoinAndSelect("q.answers", "a")
            .getOneOrFail();

        return video;
    }
}