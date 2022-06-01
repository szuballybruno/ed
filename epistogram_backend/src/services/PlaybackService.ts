import { UserVideoProgressBridge } from '../models/entity/UserVideoProgressBridge';
import { VideoPlaybackSample } from '../models/entity/playback/VideoPlaybackSample';
import { VideoProgressView } from '../models/views/VideoProgressView';
import { VideoPlaybackSampleDTO } from '../shared/dtos/VideoPlaybackSampleDTO';
import { VideoSamplingResultDTO } from '../shared/dtos/VideoSamplingResultDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { CoinAcquireService } from './CoinAcquireService';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { UserSessionActivityService } from './UserSessionActivityService';
import { VideoPlaybackSampleService } from './VideoPlaybackSampleService';

export class PlaybackService extends ServiceBase {

    private _videoPlaybackSampleService: VideoPlaybackSampleService;
    private _coinAcquireService: CoinAcquireService;
    private _userSessionActivityService: UserSessionActivityService;
    private _courseBridgeService: UserCourseBridgeService;
    private _config: GlobalConfiguration;
    private static _SAMPLE_THRESHOLD_SECONDS = 1;

    constructor(
        mapperService: MapperService,
        ormService: ORMConnectionService,
        videoPlaybackSampleService: VideoPlaybackSampleService,
        coinAcquireService: CoinAcquireService,
        userSessionActivityService: UserSessionActivityService,
        courseBridgeService: UserCourseBridgeService,
        config: GlobalConfiguration) {

        super(mapperService, ormService);

        this._userSessionActivityService = userSessionActivityService;
        this._coinAcquireService = coinAcquireService;
        this._videoPlaybackSampleService = videoPlaybackSampleService;
        this._courseBridgeService = courseBridgeService;
        this._config = config;
    }

    saveVideoPlaybackSample = async (principalId: PrincipalId, dto: VideoPlaybackSampleDTO) => {

        const userId = principalId.toSQLValue();
        const { videoPlaybackSessionId, videoItemCode, fromSeconds, toSeconds } = dto;

        // get videoId, check item code
        const { itemId: videoId, itemType } = readItemCode(videoItemCode);
        if (itemType !== 'video')
            throw new Error('Current item is not of type: video!');

        // get old playback samples
        const oldSamples = await this
            .getVideoPlaybackSamples(userId, videoId, videoPlaybackSessionId);



        // let allSamples = oldSamples
        //     .concat({
        //         fromSeconds,
        //         toSeconds
        //     } as VideoPlaybackSample);

        // let done = false;

        // while (!done) {

        //     const resutlts = allSamples
        //         .flatMap(sampleA => allSamples
        //             .map(sampleB => isOverlapping(sampleA, sampleB)));



        //     if (!resutlts.any(x => x !== null))
        //         done = true;
        // }

        // const canAppendToSample = (() => {

        //     // check count
        //     if (oldSamples.length === 0)
        //         return false;

        //     // check after
        //     const canAppendAfter = oldSamples
        //         .any(oldSample => this._sampleThresholdEquals(oldSample.toSeconds, fromSeconds));

        //     if (canAppendAfter)
        //         return 'after';

        //     // check before
        //     const canAppendBefore = oldSamples
        //         .any(oldSample => this._sampleThresholdEquals(oldSample.fromSeconds, toSeconds));

        //     if (canAppendBefore)
        //         return 'after';

        //     // no match within threshold
        //     return false;
        // })();

        // first sample in this session
        // if () {

        //     await this._ormService
        //         .getRepository(VideoPlaybackSample)
        //         .insert({
        //             videoId: videoId,
        //             userId: userId,
        //             fromSeconds: dto.fromSeconds,
        //             toSeconds: dto.toSeconds
        //         });
        // }

        // get sample chunks
        const chunks = await this._videoPlaybackSampleService
            .getSampleChunksAsync(userId, videoId);

        // calucate and save watched percent
        const watchedPercent = await this._videoPlaybackSampleService
            .getVideoWatchedPercentAsync(userId, videoId, chunks);

        const isCompleted = watchedPercent > this._config.misc.videoCompletedPercentage;
        const isCompletedBefore = await this.getVideoIsCompletedStateAsync(userId, videoId);
        const isFirstCompletion = isCompleted && !isCompletedBefore;
        const completionDate = isFirstCompletion ? new Date() : undefined;

        // squish chunks to store less data 
        await this._videoPlaybackSampleService
            .squishSamplesAsync(userId, videoId, chunks);

        // save user video progress bridge
        await this.saveUserVideoProgressBridgeAsync(userId, videoId, watchedPercent, dto.toSeconds, completionDate);

        // get max watched seconds
        const maxWathcedSeconds = await this.getMaxWatchedSeconds(userId, videoId);

        // if is watched state changed 
        // reward user with episto coins
        if (isFirstCompletion) {

            await this._coinAcquireService
                .acquireVideoWatchedCoinsAsync(userId, videoId);
        }

        // save user activity of video watching
        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId, 'video', videoId);

        return {
            isWatchedStateChanged: isFirstCompletion,
            maxWathcedSeconds
        } as VideoSamplingResultDTO;
    };

    static _squisOverlapping(overlappingSamples: VideoPlaybackSample[]) {

        const min = overlappingSamples
            .orderBy(x => x.fromSeconds)
            .first();

        const max = overlappingSamples
            .orderBy(x => x.toSeconds)
            .last();

        return {
            fromSeconds: min.fromSeconds,
            toSeconds: max.toSeconds
        } as VideoPlaybackSample;
    }

    static _mergeSamples(samples: VideoPlaybackSample[]) {

        let allOverlappingIndices: number[] = [];
        let resultSamples: VideoPlaybackSample[] = [];

        for (let sampleIndex = 0; sampleIndex < samples.length; sampleIndex++) {

            const currentSample = samples[sampleIndex];

            // ignore previously overlapping samples
            if (allOverlappingIndices.any(x => x === sampleIndex))
                continue;

            // samples that are overlapping with current 
            const overlappingSamples = samples
                .map((sample, index) => {

                    if (index <= sampleIndex)
                        return;

                    if (allOverlappingIndices
                        .any(overlappingIndex => overlappingIndex === index))
                        return;

                    return {
                        isOverlapping: this._isOverlapping(currentSample, sample),
                        sample: sample,
                        index
                    };
                })
                .filter(x => x?.isOverlapping);

            // save overlapping indices
            const overlappingIndices = overlappingSamples
                .map(x => x!.index);

            allOverlappingIndices = [...allOverlappingIndices, ...overlappingIndices];

            // to res -> squis overlapping or current sample 
            resultSamples
                .push(overlappingSamples.length > 0
                    ? this._squisOverlapping([currentSample, ...overlappingSamples.map(x => x!.sample)])
                    : currentSample);
        }

        return resultSamples;
    }

    static _isOverlapping(sampleA: VideoPlaybackSample, sampleB: VideoPlaybackSample) {

        // case 1
        const inRangeAndWatchedBefore = this
            ._inRange(sampleA.fromSeconds, sampleA.toSeconds, sampleB.toSeconds) && sampleB.fromSeconds < sampleA.fromSeconds;

        if (inRangeAndWatchedBefore)
            return true;

        // case 2
        const inRangeAndWatchedAfter = this
            ._inRange(sampleA.fromSeconds, sampleA.toSeconds, sampleB.fromSeconds) && sampleB.toSeconds > sampleA.toSeconds;

        if (inRangeAndWatchedAfter)
            return true;

        // case 3
        const superset = sampleB.fromSeconds < sampleA.fromSeconds && sampleB.toSeconds > sampleA.toSeconds;

        if (superset)
            return true;


        // case 3
        const subset = sampleB.fromSeconds > sampleA.fromSeconds && sampleB.toSeconds < sampleA.toSeconds;

        if (subset)
            return true;

        return false;
    }

    private static _inRange(rangeMin: number, rangeMax: number, value: number) {

        return rangeMin - this._SAMPLE_THRESHOLD_SECONDS < value
            && rangeMax + this._SAMPLE_THRESHOLD_SECONDS > value;
    }

    async getVideoPlaybackSamples(userId: number, videoId: number, videoPlaybackSessionId: number) {

        return this._ormService
            .query(VideoPlaybackSample, { userId, videoId, videoPlaybackSessionId })
            .where('videoId', '=', 'videoId')
            .and('userId', '=', 'userId')
            .and('videoPlaybackSessionId', '=', 'videoPlaybackSessionId')
            .getMany();
    }

    saveUserVideoProgressBridgeAsync = async (
        userId: number,
        videoId: number,
        completedPercentage: number,
        cursorSeconds: number,
        newCompletionDate?: Date) => {

        const pbd = await this._ormService
            .query(UserVideoProgressBridge, { videoId, userId })
            .where('videoId', '=', 'videoId')
            .and('userId', '=', 'userId')
            .getOneOrNull();

        // if already set, do not modify
        // otherwise use the input param 
        const completionDate = pbd?.completionDate
            ? pbd.completionDate
            : newCompletionDate;

        const videoPlaybackData = {
            id: pbd?.id,
            userId,
            videoId,
            completedPercentage,
            completionDate,
            cursorSeconds
        } as UserVideoProgressBridge;

        await this._ormService
            .getRepository(UserVideoProgressBridge)
            .save(videoPlaybackData);
    };

    getMaxWatchedSeconds = async (userId: number, videoId: number) => {

        const ads = await this._ormService
            .getRepository(VideoProgressView)
            .findOneOrFail({
                where: {
                    userId: userId,
                    videoId: videoId
                }
            });

        return ads.toSeconds;
    };

    getVideoIsCompletedStateAsync = async (userId: number, videoId: number) => {

        const pbd = await this._ormService
            .query(UserVideoProgressBridge, { userId, videoId })
            .where('videoId', '=', 'videoId')
            .and('userId', '=', 'userId')
            .getOneOrNull();

        return !!pbd?.completionDate;
    };
}