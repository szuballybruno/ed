import { UploadedFile } from "express-fileupload";
import fs from "fs";
import { Course } from "../models/entity/Course";
import { Video } from "../models/entity/Video";
import { CreateVideoDTO } from "../models/shared_models/CreateVideoDTO";
import { IdBodyDTO } from "../models/shared_models/IdBodyDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { VideoEditDTO } from "../models/shared_models/VideoEditDTO";
import { toQuestionDTO } from "../services/misc/mappings";
import { getAssetUrl } from "../services/misc/urlProvider";
import { QuestionService } from "../services/QuestionService";
import { VideoService } from "../services/VideoService";
import { staticProvider } from "../staticProvider";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class VideoController {

    private _videoService: VideoService;
    private _questionService: QuestionService;

    constructor(videoService: VideoService, questionService: QuestionService) {

        this._videoService = videoService;
        this._questionService = questionService;
    }

    createVideoAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CreateVideoDTO>(params.req.body);

        const course = await staticProvider
            .ormConnection
            .getRepository(Course)
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.videos", "v")
            .leftJoinAndSelect("c.exams", "e")
            .leftJoinAndSelect("c.modules", "m")
            .where("m.id = :moduleId", { moduleId: dto.moduleId })
            .getOneOrFail();

        const courseItemsLength = course.videos.length + course.exams.length;

        const newVideo = {
            courseId: course.id,
            moduleId: dto.moduleId,
            title: dto.title,
            subtitle: dto.subtitle,
            description: dto.description,
            orderIndex: courseItemsLength
        } as Video;

        await this._videoService.insertVideoAsync(newVideo);

        return {
            id: newVideo.id
        } as IdResultDTO;
    }

    deleteVideoAction = async (params: ActionParams) => {

        const videoId = withValueOrBadRequest<IdBodyDTO>(params.req.body).id;

        await this._videoService.deleteVideosAsync([videoId], true);
    }

    saveVideoAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<VideoEditDTO>(params.req.body);
        const videoId = dto.id;

        // update vidoeo data
        await staticProvider
            .ormConnection
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

        const videoId = withValueOrBadRequest<number>(params.req.query.videoId, "number");

        const video = await staticProvider
            .ormConnection
            .getRepository(Video)
            .createQueryBuilder("v")
            .leftJoinAndSelect("v.videoFile", "vf")
            .leftJoinAndSelect("v.questions", "vq")
            .leftJoinAndSelect("vq.answers", "vqa")
            .where("v.id = :videoId", { videoId })
            .getOneOrFail();

        return {
            id: video.id,
            title: video.title,
            description: video.description,
            subtitle: video.subtitle,
            videoLengthSeconds: video.lengthSeconds,

            questions: video
                .questions
                .map(x => toQuestionDTO(x)),

            videoFileUrl: video.videoFile
                ? getAssetUrl(video.videoFile.filePath)
                : null
        } as VideoEditDTO;
    }

    uploadVideoFileChunksAction = async (params: ActionParams) => {

        const videoId = withValueOrBadRequest<number>(params.req.body.videoId, "number");
        const tempFolder = staticProvider.rootDirectory + "\\uploads_temp";
        const filePath = tempFolder + `\\video_upload_temp_${videoId}.mp4`;

        try {

            const chunkIndex = withValueOrBadRequest<number>(params.req.body.chunkIndex, "number");

            if (chunkIndex !== 0 && !fs.existsSync(filePath))
                throw new Error("Trying to append file that does not exist!");

            const file = withValueOrBadRequest<UploadedFile>(params.req.files?.file);
            const chunksCount = withValueOrBadRequest<number>(params.req.body.chunksCount, "number");

            console.log("Recieved file chunk: #" + chunkIndex);

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