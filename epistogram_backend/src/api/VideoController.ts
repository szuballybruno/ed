import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import { Course } from '../models/entity/Course';
import { Video } from '../models/entity/Video';
import { CreateVideoDTO } from '../shared/dtos/CreateVideoDTO';
import { IdBodyDTO } from '../shared/dtos/IdBodyDTO';
import { IdResultDTO } from '../shared/dtos/IdResultDTO';
import { VideoEditDTO } from '../shared/dtos/VideoEditDTO';
import { MapperService } from '../services/MapperService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { QuestionService } from '../services/QuestionService';
import { ORMConnectionService } from '../services/sqlServices/ORMConnectionService';
import { VideoService } from '../services/VideoService';
import { ActionParams, withValueOrBadRequest } from '../utilities/helpers';

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

        const dto = withValueOrBadRequest<VideoEditDTO>(params.req.body);
        const videoId = dto.id;

        // update vidoeo data
        await this._ormService
            .getRepository(Video)
            .save({
                id: videoId,
                title: dto.title,
                subtitle: dto.subtitle,
                description: dto.description
            });

        await this._questionService
            .saveAssociatedQuestionsAsync(dto.questions, videoId);
    }

    getVideoEditDataAction = async (params: ActionParams) => {

        const videoId = withValueOrBadRequest<number>(params.req.query.videoId, 'number');

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
    }

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
    }
}