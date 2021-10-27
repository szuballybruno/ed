import { UploadedFile } from "express-fileupload";
import { Course } from "../models/entity/Course";
import { Video } from "../models/entity/Video";
import { CreateVideoDTO } from "../models/shared_models/CreateVideoDTO";
import { IdBodyDTO } from "../models/shared_models/IdBodyDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { VideoEditDTO } from "../models/shared_models/VideoEditDTO";
import { getFilePath, uploadAssigendFileAsync } from "../services/fileService";
import { toQuestionDTO } from "../services/mappings";
import { getAssetUrl } from "../services/misc/urlProvider";
import { getVideoLengthSecondsAsync } from "../services/misc/videoDurationService";
import { saveQuestionsAsync } from "../services/questionService";
import { deleteVideosAsync, getVideoByIdAsync, insertVideoAsync, setVideoFileIdAsync, uploadVideoFileAsync } from "../services/videoService";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, withValueOrBadRequest } from "../utilities/helpers";
import fs from "fs"

export const createVideoAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<CreateVideoDTO>(params.req.body);

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .leftJoinAndSelect("c.videos", "v")
        .leftJoinAndSelect("c.exams", "e")
        .where("c.id = :courseId", { courseId: dto.courseId })
        .getOneOrFail();

    const courseItemsLength = course.videos.length + course.exams.length;

    const newVideo = {
        courseId: dto.courseId,
        title: dto.title,
        subtitle: dto.subtitle,
        description: dto.description,
        orderIndex: courseItemsLength
    } as Video;

    await insertVideoAsync(newVideo);

    return {
        id: newVideo.id
    } as IdResultDTO;
}

export const deleteVideoAction = async (params: ActionParamsType) => {

    const videoId = withValueOrBadRequest<IdBodyDTO>(params.req.body).id;

    await deleteVideosAsync([videoId], true);
}

export const saveVideoAction = async (params: ActionParamsType) => {

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

    await saveQuestionsAsync(dto.questions, videoId);
}

export const getVideoEditDataAction = async (params: ActionParamsType) => {

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

export const uploadVideoFileChunksAction = async (params: ActionParamsType) => {

    const file = withValueOrBadRequest<UploadedFile>(params.req.files?.file);
    const videoId = withValueOrBadRequest<number>(params.req.body.videoId, "number");
    const chunkIndex = withValueOrBadRequest<number>(params.req.body.chunkIndex, "number");
    const chunksCount = withValueOrBadRequest<number>(params.req.body.chunksCount, "number");

    console.log("Recieved file chunk: #" + chunkIndex);

    const tempFolder = staticProvider.rootDirectory + "\\uploads_temp";
    const filePath = tempFolder + `\\video_upload_temp_${videoId}.mp4`;

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
        await uploadVideoFileAsync(videoId, fullFile);
    }
}