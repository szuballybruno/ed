import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { CourseItemDescriptorDTO } from "../models/shared_models/CourseItemDescriptorDTO";
import { CourseItemType } from "../models/shared_models/types/sharedTypes";
import { VideoWatchedPercent } from "../models/VideoWatchedPercent";
import { staticProvider } from "../staticProvider";
import { TypedError } from "../utilities/helpers";
import { getCourseItemDescriptorCode, getCourseItemDescriptorCodeFromDTO } from "./encodeService";
import { toCourseItemDTOs, toExamDTO } from "./mappings";
import { getUserById } from "./userService";
import { getVideoWatchedPercentAsync } from "./videoPlaybackSampleService";
import { getVideoByIdAsync } from "./videoService";

export const getCourseItemsDescriptorCodesAsync = async (userId: number, courseId: number) => {

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .where("c.id = :courseId", { courseId })
        .leftJoinAndSelect("c.videos", "v")
        .leftJoinAndSelect("c.exams", "e")
        .getOneOrFail();

    const codes = course
        .videos
        .map(x => ({ code: getCourseItemDescriptorCode(x.id, "video"), order: x.orderIndex }))
        .concat(course
            .exams
            .map(e => ({ code: getCourseItemDescriptorCode(e.id, "exam"), order: e.orderIndex })));

    return codes.orderBy(x => x.order).map(x => x.code);
}

export const getCurrentCourseItemDescriptorCodeAsync = async (userId: number) => {

    const user = await getUserById(userId);
    const dsc = getCurrentCourseItemDescriptor(user);
    if (!dsc)
        return null;

    return getCourseItemDescriptorCodeFromDTO(dsc);
}

export const getCourseItemDTOsAsync = async (userId: number) => {

    const user = await getUserById(userId);
    const currentCourseItemDesc = getCurrentCourseItemDescriptor(user);
    if (!currentCourseItemDesc)
        return [];

    const currentCourseItem = await getCourseItemAsync(currentCourseItemDesc!);

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .where("c.id = :courseId", { courseId: currentCourseItem.courseId })

        // videos
        .leftJoinAndSelect("c.videos", "v")
        .leftJoinAndSelect("v.questions", "vq")
        .leftJoinAndSelect("v.answerSessions", "vas")
        .leftJoinAndSelect("vas.questionAnswers", "vasqa")
        .leftJoinAndSelect("vasqa.answer", "vasqaa")

        // exams 
        .leftJoinAndSelect("c.exams", "e")
        .leftJoinAndSelect("e.questions", "eq")
        .leftJoinAndSelect("e.answerSessions", "eas")
        .leftJoinAndSelect("eas.questionAnswers", "easqa")
        .leftJoinAndSelect("easqa.answer", "easqaa")
        .getOneOrFail();

    // get video watched percents
    let videoWatchedPercents = [] as VideoWatchedPercent[];

    for (let index = 0; index < course.videos.length; index++) {

        const video = course.videos[index];
        videoWatchedPercents
            .push({
                video: video,
                watchedPercent: await getVideoWatchedPercentAsync(userId, video.id)
            })
    }

    return toCourseItemDTOs(course, currentCourseItemDesc!, videoWatchedPercents);
}

export const getCourseItemAsync = async (descriptor: CourseItemDescriptorDTO) => {

    if (descriptor.itemType == "video") {

        const video = await getVideoByIdAsync(descriptor.itemId);
        if (!video)
            throw new TypedError("Video not found by id: " + descriptor.itemId, "courseItemNotFound");

        return video;
    }
    else {

        const exam = await getExamByIdAsync(descriptor.itemId);
        if (!exam)
            throw new TypedError("Exam not found by id: " + descriptor.itemId, "courseItemNotFound");

        return exam;
    }
}

export const getCurrentCourseItemDescriptor = (user: User) => {

    const currentCourseItemId = user.currentVideoId || user.currentExamId;
    if (!currentCourseItemId)
        return null;

    const currentCourseItemType = user.currentVideoId ? "video" as CourseItemType : "exam" as CourseItemType;

    return {
        itemType: currentCourseItemType,
        itemId: currentCourseItemId
    } as CourseItemDescriptorDTO
}

export const getExamDTOAsync = async (userId: number, examId: number) => {

    const exam = await staticProvider
        .ormConnection
        .getRepository(Exam)
        .createQueryBuilder("e")
        .where("e.id = :examId", { examId })
        .leftJoinAndSelect("e.questions", "q")
        .leftJoinAndSelect("q.answers", "a")
        .getOneOrFail();

    const questionIds = exam.questions.map(x => x.id);

    if (questionIds.length == 0)
        throw new Error("Exam has no questions assigend.");

    return toExamDTO(exam);
}

const getExamByIdAsync = (examId: number) => {

    return staticProvider
        .ormConnection
        .getRepository(Exam)
        .findOne(examId);
}