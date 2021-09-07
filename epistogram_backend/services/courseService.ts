import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { User } from "../models/entity/User";
import { CourseItemDescriptorDTO } from "../models/shared_models/CourseItemDescriptorDTO";
import { CourseItemType } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { TypedError } from "../utilities/helpers";
import { toCourseItemDTOs, toExamDTO } from "./mappings";
import { getUserById } from "./userService";
import { getVideoByIdAsync } from "./videoService";

export const getCourseItemDTOsAsync = async (userId: number) => {

    const user = await getUserById(userId);
    const currentCourseItemDesc = getCurrentCourseItemDescriptor(user);
    const currentCourseItem = await getCourseItemAsync(currentCourseItemDesc);

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

    return toCourseItemDTOs(course, currentCourseItemDesc);
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