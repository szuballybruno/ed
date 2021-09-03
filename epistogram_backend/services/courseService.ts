import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { User } from "../models/entity/User";
import { CourseItemDescriptorDTO } from "../models/shared_models/CourseItemDescriptorDTO";
import { CourseItemType } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { TypedError } from "../utilities/helpers";
import { toCourseItemDTOs } from "./mappings";
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
        .leftJoinAndSelect("c.videos", "v")
        .leftJoinAndSelect("c.exams", "e")
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

const getExamByIdAsync = (examId: number) => {

    return staticProvider
        .ormConnection
        .getRepository(Exam)
        .findOne(examId);
}