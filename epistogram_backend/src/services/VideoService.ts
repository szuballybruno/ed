import {UploadedFile} from 'express-fileupload';
import {getVideoDurationInSeconds} from 'get-video-duration';
import {VideoData} from '../models/entity/video/VideoData';
import {VideoFile} from '../models/entity/video/VideoFile';
import {VideoVersion} from '../models/entity/video/VideoVersion';
import {LatestVideoView} from '../models/views/LatestVideoView';
import {QuestionDataView} from '../models/views/QuestionDataView';
import {VideoPlayerDataView} from '../models/views/VideoPlayerDataView';
import {Id} from '../shared/types/versionId';
import {PrincipalId} from '../utilities/XTurboExpress/ActionParams';
import {AuthorizationService} from './AuthorizationService';
import {FileService} from './FileService';
import {FileSystemService} from './FileSystemService';
import {LoggerService} from './LoggerService';
import {GlobalConfiguration} from './misc/GlobalConfiguration';
import {ORMConnectionService} from './ORMConnectionService/ORMConnectionService';
import {QuestionAnswerService} from './QuestionAnswerService';
import {UrlService} from './UrlService';

export class VideoService {

    constructor(
        private _ormService: ORMConnectionService,
        private _questionAnswerService: QuestionAnswerService,
        private _fileService: FileService,
        private _assetUrlService: UrlService,
        private _globalConfig: GlobalConfiguration,
        private _authorizationService: AuthorizationService,
        private _loggerService: LoggerService,
        private _fileSystemService: FileSystemService) {
    }

    answerVideoQuestionAsync(
        principalId: PrincipalId,
        answerSessionId: Id<'AnswerSession'>,
        questionVersionId: Id<'QuestionVersion'>,
        answerVersionIds: Id<'AnswerVersion'>[],
        elapsedSeconds: number) {

        return {
            action: async () => {

                // validation comes here

                return this._questionAnswerService
                    .saveGivenAnswersAsync({
                        userId: principalId.getId(),
                        answerSessionId,
                        questionVersionId,
                        answerVersionIds,
                        isExamQuestion: false,
                        elapsedSeconds
                    });
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };

    }

    setVideoFileIdAsync = async (videoVersionId: Id<'VideoVersion'>, storageFileId: Id<'StorageFile'>) => {

        const videoVersion = await this._ormService
            .query(VideoVersion, {videoVersionId})
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
            .query(LatestVideoView, {videoId})
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
            .query(QuestionDataView, {videoVersionId})
            .where('videoVersionId', '=', 'videoVersionId')
            .getMany();

        return questionData;
    }

    getVideoByVersionIdAsync = async (videoVersionId: Id<'VideoVersion'>) => {

        const video = await this._ormService
            .query(VideoPlayerDataView, {videoVersionId})
            .where('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        return video;
    };

    getVideoPlayerDataAsync = async (videoVersionId: Id<'VideoVersion'>) => {

        const videoPlayerData = await this._ormService
            .query(VideoPlayerDataView, {videoVersionId})
            .where('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        return videoPlayerData;
    };

    /**
     * Upload video file chunk
     */
    async uploadVideoFileChunksAsync({
                                         chunkIndex,
                                         chunksCount,
                                         getFile,
                                         principalId,
                                         videoVersionId
                                     }: {
        principalId: PrincipalId,
        videoVersionId: Id<'VideoVersion'>,
        chunkIndex: number,
        chunksCount: number,
        getFile: () => UploadedFile | undefined
    }) {

        const {tempFilePath, uploadsTempFolder} = this
            ._getVideoFilePath(videoVersionId);

        try {

            const isFirstChunk = chunkIndex === 0;
            const isLastChunk = chunkIndex + 1 === chunksCount;

            this._loggerService
                .logScoped('FILE UPLOAD', `Recieving file chunk #${chunkIndex}/${chunksCount}. [First chunk: ${isFirstChunk ? 'yes' : 'no'} | Last chunk: ${isLastChunk ? 'yes' : 'no'}]`);

            if (!isFirstChunk && !this._fileSystemService.exists(tempFilePath))
                throw new Error(`File chunk ${chunkIndex} error. Trying to append file that does not exist!`);

            const file = getFile();
            if (!file)
                throw new Error(`File chunk ${chunkIndex} data not sent!`);

            // create temp folder
            if (!this._fileSystemService.exists(uploadsTempFolder))
                this._fileSystemService.createFolder(uploadsTempFolder);

            // create temp file
            if (isFirstChunk)
                this._fileSystemService
                    .writeFile(tempFilePath, file.data);

            // append to temp file
            else {

                this._fileSystemService
                    .appendFile(tempFilePath, file.data);
            }

            // upload is done
            if (isLastChunk) {

                this._loggerService
                    .logScoped('FILE UPLOAD', 'Video file data recieved.');

                this._loggerService
                    .logScoped('FILE UPLOAD', 'Reading buffer to memory.');

                // read tmp file
                const fullFile = this._fileSystemService
                    .readFileAsBuffer(tempFilePath);

                this._loggerService
                    .logScoped('FILE UPLOAD', 'Deleting temp file from file system.');

                // delete tmp file
                this._fileSystemService
                    .deleteFile(tempFilePath);

                this._loggerService
                    .logScoped('FILE UPLOAD', 'Uploading to cloud storage...');

                // upload to cloud
                await this
                    ._uploadVideoFileAsync(videoVersionId, fullFile);

                this._loggerService
                    .logScoped('FILE UPLOAD', 'Video uploaded successfully.');
            }
        } catch (e) {

            this._loggerService
                .logScoped('ERROR', 'An error occured, deleting temp file: ' + tempFilePath);

            this._fileSystemService
                .deleteFileIfExists(tempFilePath);

            throw e;
        }
    }

    /**
     * Upload full video file to CDN
     */
    private _uploadVideoFileAsync = async (videoVersionId: Id<'VideoVersion'>, videoFileBuffer: Buffer) => {

        /**
         * Upload video file to CDN
         */
        const videoData = await this
            ._ormService
            .withResType<VideoData>()
            .query(VideoVersion, {videoVersionId})
            .select(VideoData)
            .leftJoin(VideoData, x => x
                .on('id', '=', 'videoDataId', VideoVersion))
            .where('id', '=', 'videoVersionId')
            .getSingle();

        const videoFileId = videoData.videoFileId!;

        const {newCDNFilePath} = await this
            ._fileService
            .uploadAssigendFileAsync({
                entitySignature: VideoFile,
                entityId: videoFileId,
                fileBuffer: videoFileBuffer,
                fileCode: 'video_file',
                storageFileIdField: 'storageFileId'
            });

        this._loggerService
            .logScoped('FILE UPLOAD', `Upload successful. CDN file path: ${newCDNFilePath}`);

        /**
         * Set video file length
         */
        await this
            ._setVideoFileLengthAsync(newCDNFilePath, videoFileId);
    };

    /**
     * Get video file path
     */
    private _getVideoFilePath(videoVersionId: Id<'VideoVersion'>) {

        const uploadsTempFolder = this._globalConfig.rootDirectory + '\\uploads_temp';
        const tempFilePath = uploadsTempFolder + `\\video_upload_temp_${videoVersionId}.mp4`;

        return {
            uploadsTempFolder,
            tempFilePath
        };
    }

    /**
     * Set video file length
     */
    private async _setVideoFileLengthAsync(cdnFilePath: string, videoFileId: Id<'VideoFile'>) {

        this._loggerService
            .logScoped('FILE UPLOAD', 'Setting video length...');

        // set video length
        const videoFileUrl = this
            ._assetUrlService
            .getAssetUrl(cdnFilePath);

        const lengthSeconds = await this
            ._getVideoLengthSecondsAsync(videoFileUrl);

        await this
            ._ormService
            .save(VideoFile, {
                id: videoFileId,
                lengthSeconds: lengthSeconds
            });

        this._loggerService
            .logScoped('FILE UPLOAD', `Video length set: ${lengthSeconds}s`);
    }

    /**
     * Get video length
     */
    private async _getVideoLengthSecondsAsync(videoFileUrl: string): Promise<number> {

        try {

            return await getVideoDurationInSeconds(videoFileUrl);
        } catch (e: any) {

            throw new Error(`Getting video duration error! Msg: ${e.message}`);
        }
    }
}
