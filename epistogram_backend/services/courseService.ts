import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { Video } from "../models/entity/Video";
import { CourseItemDescriptorDTO } from "../models/shared_models/CourseItemDescriptorDTO";
import { TextDTO } from "../models/shared_models/TextDTO";
import { CourseModeType } from "../models/shared_models/types/sharedTypes";
import { UserCoursesDataDTO } from "../models/shared_models/UserCoursesDataDTO";
import { CourseItemStateView } from "../models/views/CourseItemStateView";
import { CourseView } from "../models/views/CourseView";
import { staticProvider } from "../staticProvider";
import { TypedError } from "../utilities/helpers";
import { getCourseItemDescriptorCode, readCourseItemDescriptorCode } from "./encodeService";
import { toCourseAdminListItemDTO, toCourseItemDTO, toCourseItemDTOExam, toCourseItemDTOVideo, toCourseShortDTO, toCourseEditDataDTO, toExamDTO, toSimpleCourseItemDTOs } from "./mappings";
import { getVideoByIdAsync } from "./videoService";

export const getUserCoursesDataAsync = async (userId: number) => {

    const courses = await staticProvider
        .ormConnection
        .getRepository(CourseView)
        .find({
            where: {
                userId: userId,
            }
        });

    const inProgressCourses = courses
        .filter(x => x.isStarted && !x.isComplete);

    const completedCourses = courses
        .filter(x => x.isComplete);

    const inProgressCoursesAsCourseShortDTOs = inProgressCourses
        .map(x => toCourseShortDTO(x));

    const completedCoursesAsCourseShortDTOs = completedCourses
        .map(x => toCourseShortDTO(x));


    return {
        isAnyCoursesComplete: completedCourses.any(x => true),
        isAnyCoursesInProgress: inProgressCourses.any(x => true),

        completedCourses: completedCoursesAsCourseShortDTOs,

        inProgressCourses: inProgressCoursesAsCourseShortDTOs
    } as UserCoursesDataDTO;
}

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

export const getCurrentCourseItemsAsync = async (userId: number) => {

    // get current item 
    const courseBridge = await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .findOne({
            where: {
                userId,
                isCurrent: true
            }
        });

    if (!courseBridge)
        return [];

    const currentItemCode = getCourseItemCode(courseBridge.currentVideoId, courseBridge.currentExamId);

    // get course items 
    const courseItems = await getCourseItemsAsync(userId, courseBridge.courseId);

    // set current item's state to 'current'
    let currentItem = courseItems
        .single(item => item.descriptorCode === currentItemCode);

    currentItem.state = "current";

    return courseItems;
}

export const getCourseItemsAsync = async (userId: number, courseId: number) => {

    const courseItems = await staticProvider
        .ormConnection
        .getRepository(CourseItemStateView)
        .createQueryBuilder("cisv")
        .leftJoinAndSelect("cisv.exam", "e")
        .leftJoinAndSelect("cisv.video", "v")
        .where("cisv.courseId = :courseId", { courseId })
        .andWhere("cisv.userId = :userId", { userId })
        .orderBy("cisv.orderIndex")
        .getMany();

    return courseItems
        .map(x => toCourseItemDTO(x));
}

export const getCourseItemAsync = async (descriptor: CourseItemDescriptorDTO) => {

    if (descriptor.itemType === "video") {

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

export const getCourseItemByCodeAsync = async (descriptorCode: string) => {

    const dto = readCourseItemDescriptorCode(descriptorCode);

    return getCourseItemAsync(dto);
}

export const getCourseItemCode = (videoId?: number | null, examId?: number | null) => {

    if (videoId)
        return getCourseItemDescriptorCode(videoId, "video");

    if (examId)
        return getCourseItemDescriptorCode(examId, "exam");

    throw new Error("Arguments are null or undefined");
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

    if (questionIds.length === 0)
        throw new Error("Exam has no questions assigend.");

    return toExamDTO(exam);
}

export const getUserCourseBridgeAsync = async (userId: number, courseId: number) => {

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

export const getUserCourseBridgeOrFailAsync = async (userId: number, courseId: number) => {

    const userCourseBridge = await getUserCourseBridgeAsync(userId, courseId);
    if (!userCourseBridge)
        throw new Error("User course bridge not found, maybe the course is not yet started!");

    return userCourseBridge;
}

export const startCourseAsync = async (userId: number, courseId: number) => {

    // get irtem
    const courseItems = await getSimpleCourseItemDTOs(courseId);
    const firstCourseItem = courseItems[0];
    const firstItemDescriptor = firstCourseItem?.descriptorCode ?? null;

    if (!firstItemDescriptor)
        return {
            text: null
        } as TextDTO;

    // set current course 
    await setCurrentCourse(
        userId,
        courseId,
        firstCourseItem.type === "video" ? firstCourseItem.id : null,
        firstCourseItem.type === "exam" ? firstCourseItem.id : null);

    return {
        text: firstItemDescriptor
    } as TextDTO;
}

export const setCurrentCourse = async (
    userId: number,
    courseId: number,
    videoId: number | null,
    examId: number | null) => {

    const currentCourseBridge = await getUserCourseBridgeAsync(userId, courseId);

    // insert new bridge
    if (!currentCourseBridge) {

        await staticProvider
            .ormConnection
            .getRepository(UserCourseBridge)
            .insert({
                courseId: courseId,
                userId: userId,
                courseMode: "beginner",
                currentVideoId: videoId,
                currentExamId: examId
            } as UserCourseBridge);
    }

    // update current video/exam id 
    else {

        await staticProvider
            .ormConnection
            .getRepository(UserCourseBridge)
            .save({
                id: currentCourseBridge.id,
                currentVideoId: videoId,
                currentExamId: examId
            } as UserCourseBridge);
    }

    // get all bridges for user 
    const bridges = await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .find({
            where: {
                userId
            }
        });

    // update current bridge 
    await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .save(bridges
            .map(bridge => ({
                id: bridge.id,
                isCurrent: bridge.courseId === courseId,
            } as UserCourseBridge)));
}

export const setCourseTypeAsync = async (userId: number, courseId: number, mode: CourseModeType) => {

    const userCourseBridge = await getUserCourseBridgeAsync(userId, courseId);
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

export const getCourseEditDataAsync = async (courseId: number) => {

    // get course 
    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("course")
        .where("course.id = :courseId", { courseId: courseId })
        .leftJoinAndSelect("course.coverFile", "cf")
        .leftJoinAndSelect("course.teacher", "teacher")
        .leftJoinAndSelect("course.exams", "exams")
        .leftJoinAndSelect("course.videos", "videos")
        .leftJoinAndSelect("course.category", "cat")
        .leftJoinAndSelect("course.subCategory", "sc")
        .getOneOrFail();

    return toCourseEditDataDTO(course,);
}

export const getAdminCoursesAsync = async () => {

    const courses = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .leftJoinAndSelect("c.coverFile", "cf")
        .leftJoinAndSelect("c.teacher", "t")
        .leftJoinAndSelect("c.category", "ca")
        .leftJoinAndSelect("c.subCategory", "sc")
        .getMany();

    return courses
        .map(x => toCourseAdminListItemDTO(x));
}

export const unsetUsersCurrentCourseItemAsync = async (examId?: number, videoId?: number) => {

    const isExam = !!examId;

    // unset user current course item
    const item = isExam
        ? await staticProvider
            .ormConnection
            .getRepository(Exam)
            .findOneOrFail(examId)
        : await staticProvider
            .ormConnection
            .getRepository(Video)
            .findOneOrFail(videoId);

    const currentItemDTO = isExam
        ? toCourseItemDTOExam(item as Exam)
        : toCourseItemDTOVideo(item as Video);

    const courseId = item.courseId;

    const courseItemDTOs = await getSimpleCourseItemDTOs(courseId);

    const prevIndex = courseItemDTOs
        .findIndex(x => x.descriptorCode === currentItemDTO.descriptorCode) - 1;

    const courseItemsWithoutCurrent = courseItemDTOs
        .filter(x => x.descriptorCode !== currentItemDTO.descriptorCode);

    const previousCourseItem = prevIndex > 0
        ? courseItemDTOs[prevIndex - 1]
        : courseItemsWithoutCurrent.length > 0
            ? courseItemsWithoutCurrent[0]
            : null;

    // update bridges
    const courseBridges = await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .find({
            where: isExam
                ? {
                    currentExamId: examId,
                    courseId
                }
                : {
                    currentVideoId: videoId,
                    courseId
                }
        });

    courseBridges
        .forEach(x => {
            x.currentExamId = previousCourseItem?.type === "exam" ? previousCourseItem.id : null;
            x.currentVideoId = previousCourseItem?.type === "video" ? previousCourseItem.id : null;
        });

    await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .save(courseBridges);

    // remove current course bridge
    if (!previousCourseItem)
        await staticProvider
            .ormConnection
            .createQueryBuilder()
            .delete()
            .from(UserCourseBridge)
            .where("courseId = :courseId", { courseId })
            .execute();
}

export const getSimpleCourseItemDTOs = async (courseId: number) => {

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .leftJoinAndSelect("c.videos", "v")
        .leftJoinAndSelect("c.exams", "e")
        .where("c.id = :courseId", { courseId })
        .getOneOrFail();

    const courseItemDTOs = toSimpleCourseItemDTOs(course);

    return courseItemDTOs;
}

export const getAvailableCoursesAsync = async (userId: number) => {

    const courses = await staticProvider
        .ormConnection
        .getRepository(CourseView)
        .createQueryBuilder("cv")
        .where("cv.userId = :userId", { userId })
        .leftJoinAndSelect("cv.teacher", "t")
        .getMany();

    return courses
        .map(course => toCourseShortDTO(course));
}
