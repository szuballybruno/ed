import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { CourseItemType } from "../models/shared_models/types/sharedTypes";
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

    // temp
    getVideoPlaybackSeconds(userId, videoId);
}

export const getVideoPlaybackSeconds = async (userId: number, videoId: number) => {

    const samples = await staticProvider
        .ormConnection
        .getRepository(VideoPlaybackSample)
        .createQueryBuilder("vps")
        .where("vps.videoId = :videoId", { videoId })
        .andWhere("vps.userId = :userId", { userId })
        .getMany();

    const orderedSampels = samples
        .orderBy(x => x.fromSeconds);

    const getNextSample = (currentSec: number) => {

        const filtered = orderedSampels
            .filter(x => x.fromSeconds <= currentSec && x.toSeconds > currentSec);

        // console.log(`Filtered: ${filtered.map(x => x.fromSeconds + " -> " + x.toSeconds)}`);

        const ordered = filtered
            .orderBy(x => x.toSeconds);

        return ordered
            .firstOrNull(x => true);
    }

    let currentSec = 0;
    let finalSamples = [] as VideoPlaybackSample[];

    while (true) {

        const nextSample = getNextSample(currentSec);

        if (!nextSample)
            break;

        finalSamples.push(nextSample);
        currentSec = nextSample.toSeconds;
    }

    const minSample = finalSamples.first(x => true).fromSeconds;
    const maxSample = finalSamples.last(x => true).toSeconds;
    console.log(`${minSample} - ${maxSample}`);
}
