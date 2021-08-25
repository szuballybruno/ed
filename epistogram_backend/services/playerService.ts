import { IdType } from "../models/shared_models/types/sharedTypes";
import { VideoDTO } from "../models/shared_models/VideoDTO";
import { TypedError } from "../utilities/helpers";
import { useCollection } from "./persistance"
import { getUserDataAsync } from "./userDataService";

export const setCurrentVideoAsync = async (userId: IdType, courseId: IdType, videoId: IdType) => {

    const { updateAsync } = await useCollection("users");
    const { getItemById } = await useCollection("videos");

    const video = await getItemById(videoId);
    if (!video)
        throw new TypedError("Video not found by id: " + videoId, "videoNotFound");

    await updateAsync(userId, {
        "userData.currentCourseId": courseId,
        "userData.currentItemId": videoId
    });
}

export const getCurrentVideoAsync = async (userId: IdType, courseId: IdType, videoId: IdType) => {

    const userData = await getUserDataAsync(userId);
    const currentItem = userData.userData.currentItem;

    return {
        length: currentItem.length,
        url: currentItem.url
    } as VideoDTO;
}