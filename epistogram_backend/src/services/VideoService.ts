import { StorageFile } from '../models/entity/StorageFile';
import { VideoData } from '../models/entity/video/VideoData';
import { CourseItemEditView } from '../models/views/CourseItemEditView';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { getVideoLengthSecondsAsync } from './misc/videoDurationService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { QuestionService } from './QuestionService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UrlService } from './UrlService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { QuestionEditDataDTO } from '../shared/dtos/QuestionEditDataDTO';
import { QuestionData } from '../models/entity/question/QuestionData';
import { throwNotImplemented, withValue } from '../utilities/helpers';
import { AnswerData } from '../models/entity/answer/AnswerData';
import { X509Certificate } from 'crypto';
import { CourseController } from '../api/CourseController';
import { Index } from 'typeorm';
import { PrincipalId } from '../utilities/ActionParams';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import { VideoVersion } from '../models/entity/video/VideoVersion';
import { Video } from '../models/entity/video/Video';
import { VideoVersionView } from '../models/views/VideoVersionView';
import { VideoPlayerDataView } from '../models/views/VideoPlayerDataView';
import { QuestionDataView } from '../models/views/QuestionDataView';
import { VideoFile } from '../models/entity/video/VideoFile';
import { Id } from '../shared/types/versionId';
import { User } from '../models/entity/User';
import { AnswerSession } from '../models/entity/AnswerSession';
import { QuestionVersion } from '../models/entity/question/QuestionVersion';
import { Answer } from '../models/entity/answer/Answer';

export class VideoService extends QueryServiceBase<VideoData> {

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
        mapperService: MapperService,
        private _globalConfig: GlobalConfiguration) {

        super(mapperService, ormConnection, VideoData);

        this._questionAnswerService = questionAnswerService;
        this._userCourseBridgeService = userCourseBridgeService;
        this._fileService = fileService;
        this._questionsService = questionsService;
        this._assetUrlService = assetUrlService;
    }

    answerVideoQuestionAsync = async (
        userId: PrincipalId,
        answerSessionId: Id<AnswerSession>,
        questionVersionId: Id<QuestionVersion>,
        answerIds: Id<Answer>[],
        elapsedSeconds: number) => {

        // validation comes here

        return this._questionAnswerService
            .answerQuestionAsync(Id.create<User>(userId.toSQLValue()), answerSessionId, questionVersionId, answerIds, false, elapsedSeconds);
    };

    insertVideoAsync = async (video: VideoData, filePath?: string) => {

        throwNotImplemented();
        // if (video.id)
        //     throw new Error('Cannot insert with id!');

        // if (filePath) {
        //     const videoFileUrl = this._assetUrlService
        //         .getAssetUrl(filePath)!;

        //     video.videoFile = {
        //         filePath: filePath
        //     } as StorageFile;

        //     video.lengthSeconds = await getVideoLengthSecondsAsync(videoFileUrl);
        // }
        // else {

        //     video.lengthSeconds = 0;
        // }

        // await this._ormService
        //     .getRepository(VideoData)
        //     .save(video);
    };

    setVideoFileIdAsync = async (videoVersionId: Id<VideoVersion>, storageFileId: Id<StorageFile>) => {

        const videoVersion = await this._ormService
            .query(VideoVersion, { videoVersionId })
            .leftJoin(VideoData, x => x
                .on('id', '=', 'videoDataId', VideoVersion))
            .leftJoin(VideoFile, x => x
                .on('id', '=', 'videoFileId', VideoData))
            .where('id', '=', 'videoVersionId')
            .getSingle()

        await this._ormService
            .save(VideoFile, {
                id: videoVersion.videoData.videoFile.id,
                storageFileId: storageFileId
            });
    };

    async softDeleteVideosAsync(videoIds: Id<Video>[], unsetCurrentCourseItem: boolean) {

        // if (videoIds.length === 0)
        //     return;

        // // delete questions
        // const questions = await this._ormService
        //     .getRepository(Question)
        //     .createQueryBuilder("q")
        //     .where('"video_id" IN (:...videoIds)', { videoIds })
        //     .getMany();

        // await this._questionsService
        //     .softDeleteQuesitonsAsync(questions.map(x => x.id));

        // // delete answer sessions
        // await this._ormService
        //     .getOrmConnection()
        //     .createQueryBuilder()
        //     .delete()
        //     .from(AnswerSession)
        //     .where('"video_id" IN (:...videoIds)', { videoIds })
        //     .execute();

        // // set current course item on users
        // if (unsetCurrentCourseItem) {
        //     for (let index = 0; index < videoIds.length; index++) {

        //         const videoId = videoIds[index];
        //         await this._userCourseBridgeService
        //             .unsetUsersCurrentCourseItemAsync(undefined, videoId);
        //     }
        // }

        // // delete playback samples 
        // await this._ormService
        //     .getOrmConnection()
        //     .createQueryBuilder()
        //     .delete()
        //     .from(VideoPlaybackSample)
        //     .where('"video_id" IN (:...videoIds)', { videoIds })
        //     .execute();

        // // delete ratings 
        // await this._ormService
        //     .getOrmConnection()
        //     .createQueryBuilder()
        //     .delete()
        //     .from(VideoRating)
        //     .where('video_id IN (:...videoIds)', { videoIds })
        //     .execute();

        // // delete playback samples 
        // await this._ormService
        //     .getOrmConnection()
        //     .createQueryBuilder()
        //     .delete()
        //     .from(UserVideoProgressBridge)
        //     .where('"video_id" IN (:...videoIds)', { videoIds })
        //     .execute();

        // delete video
        await this._ormService
            .softDelete(VideoData, videoIds);
    }

    setVideoThumbnailFileId = async (videoId: Id<Video>, thumbnailFileId: Id<StorageFile>) => {

        await this._ormService
            .save(VideoData, {
                id: videoId,
                thumbnailFileId: thumbnailFileId
            });
    };


    /**
     * Get questions for a particular video.
     */
    async _getQuestionDataByVideoVersionId(videoVersionId: Id<VideoVersion>) {

        const questionData = await this._ormService
            .query(QuestionDataView, { videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .getMany()

        console.log(questionData)

        return questionData
    }

    getVideoByVersionIdAsync = async (videoVersionId: Id<VideoVersion>) => {

        const video = await this._ormService
            .query(VideoPlayerDataView, { videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        return video;
    };

    getVideoPlayerDataAsync = async (videoVersionId: Id<VideoVersion>) => {

        const videoPlayerData = await this._ormService
            .query(VideoPlayerDataView, { videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .getSingle()

        return videoPlayerData;
    };

    uploadVideoFileChunksAsync = async (
        videoId: Id<Video>,
        chunkIndex: number,
        chunksCount: number,
        getFile: () => UploadedFile | undefined) => {

        const tempFolder = this._globalConfig.rootDirectory + '\\uploads_temp';
        const filePath = tempFolder + `\\video_upload_temp_${videoId}.mp4`;

        try {

            if (chunkIndex !== 0 && !fs.existsSync(filePath))
                throw new Error('Trying to append file that does not exist!');

            const file = getFile();
            if (!file)
                throw new Error('File chunk data not sent!');

            console.log('Recieved file chunk: #' + chunkIndex);

            // create temp folder 
            if (!fs.existsSync(tempFolder)) {
                fs.mkdirSync(tempFolder);
            }

            // create & append file
            if (chunkIndex === 0) {

                fs.writeFileSync(filePath, file.data);
            }
            else {

                fs.appendFileSync(filePath, file.data);
            }

            // upload is done 
            if (chunkIndex + 1 === chunksCount) {

                console.log(`Video (id: ${videoId}) file upload is done with chunk #${chunkIndex}/${chunksCount}. Uploading to cloud storage...`);

                // read tmp file 
                const fullFile = fs.readFileSync(filePath);

                // delete tmp file 
                fs.rmSync(filePath);

                // upload to cloud 
                await this._uploadVideoFileAsync(videoId, fullFile);
            }
        }
        catch (e) {

            fs.unlinkSync(filePath);
            throw e;
        }
    };

    private _uploadVideoFileAsync = async (videoVersionId: Id<VideoVersion>, videoFileBuffer: Buffer) => {

        // upload file
        const filePath = this._fileService
            .getFilePath('videos', 'video', videoVersionId, 'mp4');

        const getVideoFile = async () => this._ormService
            .withResType<VideoFile>()
            .query(VideoVersion, { videoVersionId })
            .select(VideoFile)
            .leftJoin(VideoData, x => x
                .on('id', '=', 'videoDataId', VideoVersion))
            .leftJoin(VideoFile, x => x
                .on('id', '=', 'videoFileId', VideoData))
            .getSingle()

        await this._fileService
            .uploadAssigendFileAsync<VideoFile>(
                filePath,
                () => getVideoFile(),
                (fileId) => this.setVideoFileIdAsync(videoVersionId, fileId),
                (entity) => entity.storageFileId,
                videoFileBuffer);

        const videoFile = await getVideoFile()

        // set video length
        const videoFileUrl = this._assetUrlService
            .getAssetUrl(filePath);

        const lengthSeconds = await getVideoLengthSecondsAsync(videoFileUrl);

        await this._ormService
            .save(VideoFile, {
                id: videoFile.id,
                lengthSeconds: lengthSeconds
            });
    };
}