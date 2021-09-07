import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { CourseItemType } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { getCourseItemAsync, getCourseItemDTOsAsync, getExamDTOAsync } from "./courseService";
import { toVideoDTO } from "./mappings";
import { createAnswerSessionAsync } from "./questionAnswerService";

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
    const videoId = courseItemType == "video" ? courseItemId : null;

    const examDTO = courseItemType == "exam" ? await getExamDTOAsync(userId, courseItemId) : null;
    const examId = courseItemType == "exam" ? courseItemId : null;

    // set current course item
    await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            currentVideoId: videoId,
            currentExamId: examId
        });

    // get current course items
    const courseItemDTOs = await getCourseItemDTOsAsync(currentCourseItem.courseId);

    // get new answer session
    const answerSessionId = await createAnswerSessionAsync(userId, videoId, examId);

    return {
        courseItems: courseItemDTOs,
        video: videoDTO,
        exam: examDTO,
        answerSessionId: answerSessionId
    } as PlayerDataDTO;
}