import { UploadedFile } from 'express-fileupload';
import { getVideoDurationInSeconds } from 'get-video-duration';
import { VideoData } from '../models/tables/VideoData';
import { VideoVersion } from '../models/tables/VideoVersion';
import { QuestionDataView } from '../models/views/QuestionDataView';
import { VideoPlayerDataView } from '../models/views/VideoPlayerDataView';
import { AnswerQuestionDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { PrincipalId } from '@episto/x-core';
import { AuthorizationService } from './AuthorizationService';
import { FileService } from './FileService';
import { FileSystemService } from './FileSystemService';
import { LoggerService } from './LoggerService';
import { GlobalConfigurationService } from './GlobalConfigurationService';
import { ORMConnectionService } from './ORMConnectionService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { UrlService } from './UrlService';

export class VideoService {

    constructor(
        private _ormService: ORMConnectionService,
        private _questionAnswerService: QuestionAnswerService,
        private _fileService: FileService,
        private _assetUrlService: UrlService,
        private _globalConfig: GlobalConfigurationService,
        private _authorizationService: AuthorizationService,
        private _loggerService: LoggerService,
        private _fileSystemService: FileSystemService) {
    }

    /**
     * Answer video question async  
     */
    async answerVideoQuestionAsync(
        principalId: PrincipalId,
        dto: AnswerQuestionDTO) {

        const { answerSessionId, givenAnswer } = dto;

        return await this
            ._questionAnswerService
            .saveGivenAnswerAsync({
                userId: principalId.getId(),
                answerSessionId,
                isPractiseAnswers: false,
                givenAnswer
            });
    }

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

    /**
     * getVideoByVersionIdAsync
     */
    async getVideoByVersionIdAsync(videoVersionId: Id<'VideoVersion'>) {

        const video = await this._ormService
            .query(VideoPlayerDataView, { videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        return video;
    }

    /**
     * getVideoPlayerDataAsync
     */
    async getVideoPlayerDataAsync(videoVersionId: Id<'VideoVersion'>) {

        const videoPlayerData = await this._ormService
            .query(VideoPlayerDataView, { videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        return videoPlayerData;
    }

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

        const { tempFilePath, uploadsTempFolder } = this
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
        const { videoDataId } = await this
            ._ormService
            .getSingleById(VideoVersion, videoVersionId);

        /**
         * Create storage file 
         */
        const { newCDNFilePath, newStorageFileEntityId } = await this
            ._fileService
            .uploadStorageFileAsync({
                entitySignature: VideoData,
                entityId: videoDataId,
                fileBuffer: videoFileBuffer,
                fileCode: 'video_file',
                storageFileIdField: 'videoFileId'
            });

        /**
         * Get length
         */
        const videoFileLengthSeconds = await this
            .getVideoLengthSecondsAsync(newCDNFilePath);

        /**
         * Save data
         */
        await this
            ._ormService
            .save(VideoData, {
                id: videoDataId,
                videoFileLengthSeconds,
                videoFileId: newStorageFileEntityId
            });

        this._loggerService
            .logScoped('FILE UPLOAD', `Upload successful. CDN file path: ${newCDNFilePath}`);
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
     * Get video length
     */
    async getVideoLengthSecondsAsync(videoUrl: string): Promise<number> {

        try {
            // set video length
            const videoFileUrl = this
                ._assetUrlService
                .getAssetUrl(videoUrl);

            return await getVideoDurationInSeconds(videoFileUrl);
        } catch (e: any) {

            throw new Error(`Getting video duration error! Msg: ${e.message}`);
        }
    }
}
