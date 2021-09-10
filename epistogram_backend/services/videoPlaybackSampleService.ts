import { getVideoDurationInSeconds } from 'get-video-duration';
import { Video } from "../models/entity/Video";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { staticProvider } from "../staticProvider";
import { hasValue, navPropNotNull } from "../utilities/helpers";
import { getAssetUrl } from "./misc/urlProvider";

export type VideoPlaybackSampleChunk = {
    startSeconds: number;
    endSeconds: number;
}

export const getVideoWatchedPercentAsync = async (userId: number, videoId: number) => {

    const video = await staticProvider
        .ormConnection
        .getRepository(Video)
        .createQueryBuilder("v")
        .where("v.id = :videoId", { videoId })
        .leftJoinAndSelect("v.videoFile", "vf")
        .getOneOrFail();

    if (!video.videoFile)
        return 0;

    const videoFileUrl = getAssetUrl(video.videoFile.filePath)!;
    const videoFileDurationSeconds = await getVideoDurationInSeconds(videoFileUrl);

    const chunks = await getSampleChunksAsync(userId, videoId);
    if (chunks.length == 0)
        return 0;

    const netWatchedSeconds = chunks
        .map(x => x.endSeconds - x.startSeconds)
        .reduce((prev, curr) => curr + prev);

    // console.log(`Watched ${videoFileDurationSeconds}s/${netWatchedSeconds}s`);

    return Math.round((netWatchedSeconds / videoFileDurationSeconds) * 100);
}

const getSampleChunksAsync = async (userId: number, videoId: number) => {

    const samples = await staticProvider
        .ormConnection
        .getRepository(VideoPlaybackSample)
        .createQueryBuilder("vps")
        .where("vps.videoId = :videoId", { videoId })
        .andWhere("vps.userId = :userId", { userId })
        .getMany();

    const orderedSampels = samples
        .orderBy(x => x.fromSeconds);

    let searchCursorSecs = 0;
    let chunks = [] as VideoPlaybackSampleChunk[];

    while (true) {

        const sampleChunk = getSampleChunk(orderedSampels, searchCursorSecs);
        if (!sampleChunk)
            break;

        chunks.push(sampleChunk);
        searchCursorSecs = sampleChunk.endSeconds;
    }

    return chunks;
}

const getSampleChunk = (orderedSampels: VideoPlaybackSample[], searchCursorSecs: number) => {

    let lastSampleToSeconds = orderedSampels
        .firstOrNull(x => x.fromSeconds >= searchCursorSecs)
        ?.fromSeconds;

    if (!hasValue(lastSampleToSeconds))
        return null;

    let finalSamples = [] as VideoPlaybackSample[];

    while (true) {

        const nextSample = getNextSample(orderedSampels, lastSampleToSeconds!);
        if (!nextSample)
            break;

        finalSamples.push(nextSample);
        lastSampleToSeconds = nextSample.toSeconds;
    }

    const minSample = finalSamples.first(x => true).fromSeconds;
    const maxSample = finalSamples.last(x => true).toSeconds;

    return {
        startSeconds: minSample,
        endSeconds: maxSample
    } as VideoPlaybackSampleChunk;
}

const getNextSample = (orderedSampels: VideoPlaybackSample[], lastSampleToSeconds: number) => {

    const sampleChaninigThrashold = 0.5;

    const isJoinedSample = (sample: VideoPlaybackSample) => {

        return sample.fromSeconds <= lastSampleToSeconds + sampleChaninigThrashold
            && sample.toSeconds > lastSampleToSeconds;
    }

    return orderedSampels
        .filter(sample => isJoinedSample(sample))
        .orderBy(sample => sample.toSeconds)
        .firstOrNull(sample => true);
}