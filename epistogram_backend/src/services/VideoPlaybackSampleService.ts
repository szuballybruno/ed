import { Video } from '../models/entity/Video';
import { VideoPlaybackSample } from '../models/entity/VideoPlaybackSample';
import { hasValue } from '../utilities/helpers';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export type VideoPlaybackSampleChunk = {
    startSeconds: number;
    endSeconds: number;
}

export class VideoPlaybackSampleService {

    private _ormService: ORMConnectionService;

    constructor(ormService: ORMConnectionService) {

        this._ormService = ormService;
    }

    getVideoWatchedPercentAsync = async (userId: number, videoId: number, chunks: VideoPlaybackSampleChunk[]) => {

        if (chunks.length === 0)
            return 0;

        const video = await this._ormService
            .getRepository(Video)
            .createQueryBuilder('v')
            .where('v.id = :videoId', { videoId })
            .getOneOrFail();

        if (video.lengthSeconds === 0)
            return 0;

        const netWatchedSeconds = chunks
            .map(x => x.endSeconds - x.startSeconds)
            .reduce((prev, curr) => curr + prev);

        return Math.round((netWatchedSeconds / video.lengthSeconds) * 100);
    }

    squishSamplesAsync = async (userId: number, videoId: number, chunks: VideoPlaybackSampleChunk[]) => {

        await this._ormService
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(VideoPlaybackSample)
            .where('userId = :userId', { userId })
            .andWhere('videoId = :videoId', { videoId })
            .execute();

        await this._ormService
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

    getSampleChunksAsync = async (userId: number, videoId: number) => {

        const samples = await this._ormService
            .getRepository(VideoPlaybackSample)
            .createQueryBuilder('vps')
            .where('vps.videoId = :videoId', { videoId })
            .andWhere('vps.userId = :userId', { userId })
            .getMany();

        const orderedSampels = samples
            .orderBy(x => x.fromSeconds);

        let searchCursorSecs = 0;
        const chunks = [] as VideoPlaybackSampleChunk[];

        while (true) {

            const sampleChunk = this.getSampleChunk(orderedSampels, searchCursorSecs);
            if (!sampleChunk)
                break;

            chunks.push(sampleChunk);
            searchCursorSecs = sampleChunk.endSeconds;
        }

        return chunks;
    }

    getSampleChunk = (orderedSampels: VideoPlaybackSample[], searchCursorSecs: number) => {

        let lastSampleToSeconds = orderedSampels
            .firstOrNull(x => x.fromSeconds >= searchCursorSecs)
            ?.fromSeconds;

        if (!hasValue(lastSampleToSeconds))
            return null;

        const finalSamples = [] as VideoPlaybackSample[];

        while (true) {

            const nextSample = this.getNextSample(orderedSampels, lastSampleToSeconds!);
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

    getNextSample = (orderedSampels: VideoPlaybackSample[], lastSampleToSeconds: number) => {

        const sampleChaninigThrashold = 0.5;

        const isJoinedSample = (sample: VideoPlaybackSample) => {

            return sample.fromSeconds <= lastSampleToSeconds + sampleChaninigThrashold
                && sample.toSeconds > lastSampleToSeconds;
        };

        return orderedSampels
            .filter(sample => isJoinedSample(sample))
            .orderBy(sample => sample.toSeconds)
            .firstOrNull(sample => true);
    }
}