import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { User } from "../models/entity/User";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { Video } from "../models/entity/Video";
import { CourseItemDescriptorDTO } from "../models/shared_models/CourseItemDescriptorDTO";
import { CourseItemType, CourseModeType } from "../models/shared_models/types/sharedTypes";
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
        .leftJoinAndSelect("v.videoPlaybackDatas", "vpd")
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

    return toCourseItemDTOs(course, currentCourseItemDesc!);
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

export const getUserCourseBridge = async (userId: number, courseId: number) => {

    const userCourseBridge = await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .findOne({
            where: {
                userId: userId,
                courseId: courseId
            }
        });

    return userCourseBridge;
}

export const startCourseAsync = async (userId: number, courseId: number) => {

    const userCourseBridge = await getUserCourseBridge(userId, courseId);
    if (!userCourseBridge)
        await staticProvider
            .ormConnection
            .getRepository(UserCourseBridge)
            .save({
                courseId: courseId,
                userId: userId,
            } as UserCourseBridge);
}

export const setCourseTypeAsync = async (userId: number, courseId: number, mode: CourseModeType) => {

    const userCourseBridge = await getUserCourseBridge(userId, courseId);
    if (!userCourseBridge)
        throw new Error("User course bridge not found!");

    await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .save({
            courseId: courseId,
            userId: userId,
            id: userCourseBridge.id,
            courseMode: mode
        } as UserCourseBridge);
}

const getExamByIdAsync = (examId: number) => {

    return staticProvider
        .ormConnection
        .getRepository(Exam)
        .findOne(examId);
}