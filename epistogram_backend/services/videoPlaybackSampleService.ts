import { Video } from "../models/entity/Video";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { staticProvider } from "../staticProvider";
import { hasValue } from "../utilities/helpers";

export type VideoPlaybackSampleChunk = {
    startSeconds: number;
    endSeconds: number;
}

export const getVideoWatchedPercentAsync = async (userId: number, videoId: number, chunks: VideoPlaybackSampleChunk[]) => {

    if (chunks.length == 0)
        return 0;

    const video = await staticProvider
        .ormConnection
        .getRepository(Video)
        .createQueryBuilder("v")
        .where("v.id = :videoId", { videoId })
        .getOneOrFail();

    if (video.lengthSeconds == 0)
        return 0;

    const netWatchedSeconds = chunks
        .map(x => x.endSeconds - x.startSeconds)
        .reduce((prev, curr) => curr + prev);

    return Math.round((netWatchedSeconds / video.lengthSeconds) * 100);
}

export const squishSamplesAsync = async (userId: number, videoId: number, chunks: VideoPlaybackSampleChunk[]) => {

    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(VideoPlaybackSample)
        .where("userId = :userId", { userId })
        .andWhere("videoId = :videoId", { videoId })
        .execute();

    await staticProvider
        .ormConnection
        .getRepository(VideoPlaybackSample)
        .save(chunks
            .map(chunk => {

                return {
                    fromSeconds: chunk.startSeconds,
                    toSeconds: chunk.endSeconds,
                    userId: userId,
                    videoId: videoId
                } as VideoPlaybackSample;
            }));
}

export const getSampleChunksAsync = async (userId: number, videoId: number) => {

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