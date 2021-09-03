import { Exam } from "../models/entity/Exam";
import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { CourseItemType } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { TypedError } from "../utilities/helpers";
import { getCourseItemAsync, getCourseItemDTOsAsync, getCurrentCourseItemDescriptor } from "./courseService";
import { toExamDTO, toVideoDTO } from "./mappings";
import { getUserById } from "./userService";
import { getVideoByIdAsync } from "./videoService";



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

    // get course item
    const currentCourseItem = await getCourseItemAsync({ itemId: courseItemId, itemType: courseItemType });
    const videoDTO = courseItemType == "video" ? toVideoDTO(currentCourseItem as Video) : null;
    const examDTO = courseItemType == "exam" ? toExamDTO(currentCourseItem as Exam) : null;

    // set current course item
    await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            currentVideoId: courseItemType == "video" ? courseItemId : null,
            currentExamId: courseItemType == "exam" ? courseItemId : null
        });

    // get current course items
    const courseItemDTOs = await getCourseItemDTOsAsync(currentCourseItem.courseId);

    return {
        courseItems: courseItemDTOs,
        video: videoDTO,
        exam: examDTO
    } as PlayerDataDTO;
}