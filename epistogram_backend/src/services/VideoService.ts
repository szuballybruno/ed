import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import { VideoData } from '../models/entity/video/VideoData';
import { VideoFile } from '../models/entity/video/VideoFile';
import { VideoVersion } from '../models/entity/video/VideoVersion';
import { QuestionDataView } from '../models/views/QuestionDataView';
import { VideoPlayerDataView } from '../models/views/VideoPlayerDataView';
import { PrincipalId } from '../utilities/ActionParams';
import { throwNotImplemented } from '../utilities/helpers';
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
        answerSessionId: number,
        questionVersionId: number,
        answerIds: number[],
        elapsedSeconds: number) => {

        // validation comes here

        return this._questionAnswerService
            .answerQuestionAsync(userId.toSQLValue(), answerSessionId, questionVersionId, answerIds, false, elapsedSeconds);
    };

    setVideoFileIdAsync = async (videoVersionId: number, storageFileId: number) => {

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

    setVideoThumbnailFileId = async (videoId: number, thumbnailFileId: number) => {

        await this._ormService
            .save(VideoData, {
                id: videoId,
                thumbnailFileId: thumbnailFileId
            });
    };


    /**
     * Get questions for a particular video.
     */
    async _getQuestionDataByVideoVersionId(videoVersionId: number) {

        const questionData = await this._ormService
            .query(QuestionDataView, { videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .getMany()

        console.log(questionData)

        return questionData
    }

    getVideoByVersionIdAsync = async (videoVersionId: number) => {

        const video = await this._ormService
            .query(VideoPlayerDataView, { videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        return video;
    };

    getVideoPlayerDataAsync = async (videoVersionId: number) => {

        const videoPlayerData = await this._ormService
            .query(VideoPlayerDataView, { videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .getSingle()

        return videoPlayerData;
    };

    uploadVideoFileChunksAsync = async (
        videoId: number,
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

    private _uploadVideoFileAsync = async (videoVersionId: number, videoFileBuffer: Buffer) => {

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