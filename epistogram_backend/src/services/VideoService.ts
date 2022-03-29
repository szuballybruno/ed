import { AnswerSession } from "../models/entity/AnswerSession";
import { Question } from "../models/entity/Question";
import { StorageFile } from "../models/entity/StorageFile";
import { Video } from "../models/entity/Video";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { FileService } from "./FileService";
import { log } from "./misc/logger";
import { UrlService } from "./UrlService";
import { getVideoLengthSecondsAsync } from "./misc/videoDurationService";
import { QuestionAnswerService } from "./QuestionAnswerService";
import { QuestionService } from "./QuestionService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";
import { VideoRating } from "../models/entity/VideoRating";
import { UserVideoProgressBridge } from "../models/entity/UserVideoProgressBridge";
import { Mutation } from "../shared/dtos/mutations/Mutation";
import { FieldMutation } from "../shared/dtos/mutations/FieldMutation";
import { QueryServiceBase } from "./misc/ServiceBase";
import { MapperService } from "./MapperService";

export class VideoService extends QueryServiceBase<Video> {

    private _userCourseBridgeService: UserCourseBridgeService;
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
        assetUrlService: UrlService,
        mapperService: MapperService) {

        super(mapperService, ormConnection, Video);

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
        elapsedSeconds: number) => {

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

        await this._ormService
            .getRepository(Video)
            .save(video);
    }

    setVideoFileIdAsync = async (videoId: number, videoFileId: number) => {

        await this._ormService
            .getRepository(Video)
            .save({
                id: videoId,
                videoFileId: videoFileId
            });
    }

    deleteVideosAsync = async (videoIds: number[], unsetCurrentCourseItem: boolean) => {

        if (videoIds.length === 0)
            return;

        // delete questions
        const questions = await this._ormService
            .getRepository(Question)
            .createQueryBuilder("q")
            .where('"video_id" IN (:...videoIds)', { videoIds })
            .getMany();

        await this._questionsService
            .deleteQuesitonsAsync(questions.map(x => x.id));

        // delete answer sessions
        await this._ormService
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
        await this._ormService
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(VideoPlaybackSample)
            .where('"video_id" IN (:...videoIds)', { videoIds })
            .execute();

        // delete ratings 
        await this._ormService
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(VideoRating)
            .where('video_id IN (:...videoIds)', { videoIds })
            .execute();

        // delete playback samples 
        await this._ormService
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(UserVideoProgressBridge)
            .where('"video_id" IN (:...videoIds)', { videoIds })
            .execute();

        // delete video
        await this._ormService
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

        await this._ormService
            .getRepository(Video)
            .save({
                id: videoId,
                lengthSeconds: lengthSeconds
            })
    }

    setVideoThumbnailFileId = async (videoId: number, thumbnailFileId: number) => {

        await this._ormService
            .getRepository(Video)
            .save({
                id: videoId,
                thumbnailFileId: thumbnailFileId
            });
    }

    getVideoByIdAsync = async (videoId: number) => {

        const video = await this._ormService
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