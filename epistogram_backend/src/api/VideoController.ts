import fs from 'fs';
import { Video } from '../models/entity/Video';
import { MapperService } from '../services/MapperService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { QuestionService } from '../services/QuestionService';
import { ORMConnectionService } from '../services/ORMConnectionService/ORMConnectionService';
import { VideoService } from '../services/VideoService';
import { VideoEditDTO } from '../shared/dtos/VideoEditDTO';
import { ActionParams } from "../utilities/ActionParams";

export class VideoController {

    private _videoService: VideoService;
    private _questionService: QuestionService;
    private _ormService: ORMConnectionService;
    private _config: GlobalConfiguration;
    private _mapperService: MapperService;

    constructor(
        videoService: VideoService,
        questionService: QuestionService,
        ormService: ORMConnectionService,
        config: GlobalConfiguration,
        mapperService: MapperService) {

        this._videoService = videoService;
        this._questionService = questionService;
        this._ormService = ormService;
        this._config = config;
        this._mapperService = mapperService;
    }

    saveVideoAction = async (params: ActionParams) => {

        const body = params
            .getBody<VideoEditDTO>();

        const videoId = body
            .getValue(x => x.id, 'int');

        // update vidoeo data
        await this._ormService
            .getRepository(Video)
            .save({
                id: videoId,
                title: body.getValue(x => x.title, 'string'),
                subtitle: body.getValue(x => x.subtitle, 'string'),
                description: body.getValue(x => x.description, 'string')
            });

        await this._questionService
            .saveAssociatedQuestionsAsync(body.getValue(x => x.questions, 'custom', x => true), videoId);
    };

    getVideoEditDataAction = async (params: ActionParams) => {

        const videoId = params
            .getQuery()
            .getValue(x => x.videoId, 'int');

        const video = await this._ormService
            .getRepository(Video)
            .createQueryBuilder('v')
            .leftJoinAndSelect('v.videoFile', 'vf')
            .leftJoinAndSelect('v.questions', 'vq')
            .leftJoinAndSelect('vq.answers', 'vqa')
            .where('v.id = :videoId', { videoId })
            .getOneOrFail();

        return this._mapperService
            .map(Video, VideoEditDTO, video);
    };

    getVideoQuestionEditDataAction = async (params: ActionParams) => {

        const query = params
            .getQuery<any>();

        const videoId = query
            .getValue(x => x.videoId, 'int');

        return await this._videoService
            .getVideoQuestionEditDataAsync(videoId);
    };

    saveVideoQuestionEditDataAction = async (params: ActionParams) => {
        const mutations = params
            .getBody()
            .data;

        await this._videoService
            .saveVideoQuestionEditDataAsync(mutations);
    };

    uploadVideoFileChunksAction = async (params: ActionParams) => {

        const body = params
            .getBody<{
                videoId: number,
                chunkIndex: number,
                chunksCount: number
            }>();

        const videoId = body.getValue(x => x.videoId, 'int');
        const chunksCount = body.getValue(x => x.chunksCount, 'int');
        const chunkIndex = body.getValue(x => x.chunkIndex, 'int');

        const tempFolder = this._config.rootDirectory + '\\uploads_temp';
        const filePath = tempFolder + `\\video_upload_temp_${videoId}.mp4`;

        try {

            if (chunkIndex !== 0 && !fs.existsSync(filePath))
                throw new Error('Trying to append file that does not exist!');

            const file = params.getSingleFile();
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
                await this._videoService.uploadVideoFileAsync(videoId, fullFile);
            }
        }
        catch (e) {

            fs.unlinkSync(filePath);
            throw e;
        }
    };
}