import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { CourseItemType } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { TypedError } from "../utilities/helpers";
import { toPlayerDataDTO, toVideoDTO } from "./mappings";

export const getCurrentVideoAsync = async (userId: number, videoId: number) => {

    // return video
    const user = await staticProvider
        .ormConnection
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :userId", { userId: userId })
        .leftJoinAndSelect("user.currentVideo", "video")
        .getOneOrFail();

    const currentVideo = user.currentVideo!;

    return toVideoDTO(currentVideo);
}

export const getPlayerDataAsync = async (
    userId: number,
    courseItemId: number,
    courseItemType: CourseItemType) => {

    const courseItem = await setAndGetCurrentCourseItem(userId, courseItemId, courseItemType);

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .where("c.id = :courseId", { courseId: courseItem.courseId })
        .leftJoinAndSelect("c.videos", "v")
        .leftJoinAndSelect("c.exams", "e")
        .getOneOrFail();

    return toPlayerDataDTO(
        course,
        courseItemType == "video" ? courseItem as Video : null,
        courseItemType == "exam" ? courseItem as Exam : null);
}

const setAndGetCurrentCourseItem = async (userId: number, courseItemId: number, courseItemType: CourseItemType) => {
    if (courseItemType == "video") {

        // set current video 
        await setCurrentVideoAsync(userId, courseItemId);

        // get player data
        const video = await staticProvider
            .ormConnection
            .getRepository(Video)
            .findOneOrFail(courseItemId);

        return video;
    }
    else {

        // set current exam
        await setCurrentExamAsync(userId, courseItemId);

        // get player data
        const exam = await staticProvider
            .ormConnection
            .getRepository(Exam)
            .findOneOrFail(courseItemId);

        return exam;
    }
}

const setCurrentVideoAsync = async (userId: number, videoId: number) => {

    const video = await getVideoByIdAsync(videoId);
    if (!video)
        throw new TypedError("Video not found by id: " + videoId, "courseItemNotFound");

    return await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            currentVideoId: videoId
        });
}

const setCurrentExamAsync = async (userId: number, examId: number) => {

    const exam = await getExamByIdAsync(examId);
    if (!exam)
        throw new TypedError("Exam not found by id: " + examId, "courseItemNotFound");

    return await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            currentExamId: examId
        });
}

const getVideoByIdAsync = (videoId: number) => {

    return staticProvider
        .ormConnection
        .getRepository(Video)
        .findOne(videoId);
}

const getExamByIdAsync = (examId: number) => {

    return staticProvider
        .ormConnection
        .getRepository(Exam)
        .findOne(examId);
}