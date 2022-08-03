import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import { User } from '../models/entity/User';
import { VideoData } from '../models/entity/video/VideoData';
import { VideoFile } from '../models/entity/video/VideoFile';
import { VideoVersion } from '../models/entity/video/VideoVersion';
import { LatestVideoView } from '../models/views/LatestVideoView';
import { QuestionDataView } from '../models/views/QuestionDataView';
import { VideoPlayerDataView } from '../models/views/VideoPlayerDataView';
import { Id } from '../shared/types/versionId';
import { throwNotImplemented } from '../utilities/helpers';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { AuthorizationService } from './AuthorizationService';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { QuestionService } from './QuestionService';
import { UrlService } from './UrlService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class VideoService extends QueryServiceBase<VideoData> {

    private _userCourseBridgeService: UserCourseBridgeService;
    private _questionAnswerService: QuestionAnswerService;
    private _fileService: FileService;
    private _questionsService: QuestionService;
    private _assetUrlService: UrlService;
    private _authorizationService: AuthorizationService;

    constructor(
        ormConnection: ORMConnectionService,
        userCourseBridgeService: UserCourseBridgeService,
        questionAnswerService: QuestionAnswerService,
        fileService: FileService,
        questionsService: QuestionService,
        assetUrlService: UrlService,
        mapperService: MapperService,
        private _globalConfig: GlobalConfiguration,
        authorizationService: AuthorizationService) {

        super(mapperService, ormConnection, VideoData);

        this._questionAnswerService = questionAnswerService;
        this._userCourseBridgeService = userCourseBridgeService;
        this._fileService = fileService;
        this._questionsService = questionsService;
        this._assetUrlService = assetUrlService;
        this._authorizationService = authorizationService;
    }

    answerVideoQuestionAsync(
        principalId: PrincipalId,
        answerSessionId: Id<'AnswerSession'>,
        questionVersionId: Id<'QuestionVersion'>,
        answerIds: Id<'Answer'>[],
        elapsedSeconds: number) {

        return {
            action: async () => {

                // validation comes here

                return this._questionAnswerService
                    .saveGivenAnswerAsync(principalId.getId(), answerSessionId, questionVersionId, answerIds, false, elapsedSeconds);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
            }
        };

    }

    setVideoFileIdAsync = async (videoVersionId: Id<'VideoVersion'>, storageFileId: Id<'StorageFile'>) => {

        const videoVersion = await this._ormService
            .query(VideoVersion, { videoVersionId })
            .leftJoin(VideoData, x => x
                .on('id', '=', 'videoDataId', VideoVersion))
            .leftJoin(VideoFile, x => x
                .on('id', '=', 'videoFileId', VideoData))
            .where('id', '=', 'videoVersionId')
            .getSingle();

        await this._ormService
            .save(VideoFile, {
                id: videoVersion.videoData.videoFile.id,
                storageFileId: storageFileId
            });
    };

    setVideoThumbnailFileId = async (videoId: Id<'Video'>, thumbnailFileId: Id<'StorageFile'>) => {

        const videoData = await this._ormService
            .withResType<VideoData>()
            .query(LatestVideoView, { videoId })
            .select(VideoData)
            .leftJoin(VideoVersion, (x => x
                .on('id', '=', 'videoVersionId', LatestVideoView)))
            .leftJoin(VideoData, (x => x
                .on('id', '=', 'videoDataId', VideoVersion)))
            .where('videoId', '=', 'videoId')
            .getSingle();

        const videoDataId = videoData.id;

        await this._ormService
            .save(VideoData, {
                id: videoDataId,
                thumbnailFileId: thumbnailFileId
            });
    };


    /**
     * Get questions for a particular video.
     */
    async _getQuestionDataByVideoVersionId(videoVersionId: Id<'VideoVersion'>) {

        const questionData = await this._ormService
            .query(QuestionDataView, { videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .getMany();

        return questionData;
    }

    getVideoByVersionIdAsync = async (videoVersionId: Id<'VideoVersion'>) => {

        const video = await this._ormService
            .query(VideoPlayerDataView, { videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        return video;
    };

    getVideoPlayerDataAsync = async (videoVersionId: Id<'VideoVersion'>) => {

        const videoPlayerData = await this._ormService
            .query(VideoPlayerDataView, { videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        return videoPlayerData;
    };

    uploadVideoFileChunksAsync(
        principalId: PrincipalId,
        videoId: Id<'Video'>,
        chunkIndex: number,
        chunksCount: number,
        getFile: () => UploadedFile | undefined): ControllerActionReturnType {

        return {
            action: async () => {
                const videoVersion = await this._ormService
                    .query(LatestVideoView, { videoId })
                    .getSingle();

                const videoVersionId = videoVersion.videoVersionId;

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
                        await this._uploadVideoFileAsync(videoVersionId, fullFile);
                    }
                }
                catch (e) {

                    fs.unlinkSync(filePath);
                    throw e;
                }
            },
            auth: async () => {

                const { companyId } = await this._ormService
                    .query(User, { userId: principalId.toSQLValue() })
                    .where('id', '=', 'userId')
                    .getSingle();

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'VIEW_COURSE_ADMIN', { companyId });
            }
        };


    }

    private _uploadVideoFileAsync = async (videoVersionId: Id<'VideoVersion'>, videoFileBuffer: Buffer) => {

        throwNotImplemented();
        // upload file
        // const filePath = this._fileService
        //     .getFilePath('video_file', videoVersionId);

        // const videoData = await this._ormService
        //     .withResType<VideoData>()
        //     .query(VideoVersion, { videoVersionId })
        //     .select(VideoData)
        //     .leftJoin(VideoData, x => x
        //         .on('id', '=', 'videoDataId', VideoVersion))
        //     .where('id', '=', 'videoVersionId')
        //     .getSingle();

        // await this._fileService
        //     .uploadAssigendFile2Async({
        //         entitySignature: VideoFile,
        //         entityId: videoData.videoFileId,
        //         fileBuffer: videoFileBuffer,
        //         fileCode: 'video_file',
        //         storageFileIdField: 'storageFileId'
        //     });

        // const videoFile = await getVideoFile()

        // // set video length
        // const videoFileUrl = this._assetUrlService
        //     .getAssetUrl(filePath);

        // const lengthSeconds = await getVideoLengthSecondsAsync(videoFileUrl);

        // await this._ormService
        //     .save(VideoFile, {
        //         id: videoFile.id,
        //         lengthSeconds: lengthSeconds
        //     });
    };
}