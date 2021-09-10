import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { staticProvider } from "../staticProvider";
import { getCourseItemAsync, getCourseItemDTOsAsync, getCurrentCourseItemDescriptor, getExamDTOAsync } from "./courseService";
import { readCourseItemDescriptorCode } from "./encodeService";
import { toVideoDTO } from "./mappings";
import { createAnswerSessionAsync } from "./questionAnswerService";
import { getUserById } from "./userService";

export const getPlayerDataAsync = async (
    userId: number,
    descriptorCode: string) => {

    const { itemId: courseItemId, itemType: courseItemType } = readCourseItemDescriptorCode(descriptorCode);

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
    const courseItemDTOs = await getCourseItemDTOsAsync(userId);

    // get new answer session
    const answerSessionId = await createAnswerSessionAsync(userId, examId, videoId);

    return {
        courseItems: courseItemDTOs,
        video: videoDTO,
        exam: examDTO,
        answerSessionId: answerSessionId
    } as PlayerDataDTO;
}

export const saveVideoPlaybackSample = async (userId: number, dto: VideoPlaybackSampleDTO) => {

    const user = await getUserById(userId);
    const currentItemDesc = getCurrentCourseItemDescriptor(user);

    if (!currentItemDesc)
        throw new Error("Cannot add video playback sample while current course item is not set!");

    if (currentItemDesc.itemType !== "video")
        throw new Error("Cannot add video playback sample while current course item is not a video!");

    const videoId = currentItemDesc.itemId;

    await staticProvider
        .ormConnection
        .getRepository(VideoPlaybackSample)
        .insert({
            videoId: videoId,
            userId: userId,
            fromSeconds: dto.fromSeconds,
            toSeconds: dto.toSeconds
        });
}
