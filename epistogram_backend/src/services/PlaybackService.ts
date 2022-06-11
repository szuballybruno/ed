import { VideoPlaybackSample } from '../models/entity/playback/VideoPlaybackSample';
import { VideoSeekEvent } from '../models/entity/playback/VideoSeekEvent';
import { UserVideoProgressBridge } from '../models/entity/UserVideoProgressBridge';
import { Video } from '../models/entity/video/Video';
import { VideoProgressView } from '../models/views/VideoProgressView';
import { VideoPlaybackSampleDTO } from '../shared/dtos/playback/VideoPlaybackSampleDTO';
import { VideoSeekEventDTO } from '../shared/dtos/playback/VideoSeekEventDTO';
import { VideoSamplingResultDTO } from '../shared/dtos/VideoSamplingResultDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { CoinAcquireService } from './CoinAcquireService';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { SampleMergeService } from './SampleMergeService';
import { UserSessionActivityService } from './UserSessionActivityService';

export class PlaybackService extends ServiceBase {

    constructor(
        mapperService: MapperService,
        ormService: ORMConnectionService,
        private _coinAcquireService: CoinAcquireService,
        private _userSessionActivityService: UserSessionActivityService,
        private _config: GlobalConfiguration,
        private _sampleMergeService: SampleMergeService) {

        super(mapperService, ormService);
    }

    /**
     * Reciveves an incoming video playback sample. 
     * - Merges the new sample with the existing ones, and saves them to the DB.
     * - Calculates the video progress.
     * - Handles video completion related stuff.
     * - Saves user activity.
     * Returns: the completion flag, and a value of maxWatchedSeconds 
     */
    saveVideoPlaybackSample = async (principalId: PrincipalId, dto: VideoPlaybackSampleDTO) => {

        const userId = principalId.toSQLValue();
        const { videoPlaybackSessionId, videoItemCode, fromSeconds, toSeconds } = dto;

        // get videoId, check item code
        const { itemId: videoId, itemType } = readItemCode(videoItemCode);
        if (itemType !== 'video')
            throw new Error('Current item is not of type: video!');

        // handle sample merge
        const { mergedSamples } = await this
            ._handleSampleMerge(userId, videoId, videoPlaybackSessionId, fromSeconds, toSeconds);

        // handle video progress
        const { isFirstCompletion } = await this
            ._handleVideoProgressAsync(userId, videoId, toSeconds, mergedSamples);

        // save user activity of video watching
        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId, 'video', videoId);

        // get max watched seconds
        const maxWathcedSeconds = await this.getMaxWatchedSeconds(userId, videoId);

        return {
            isWatchedStateChanged: isFirstCompletion,
            maxWathcedSeconds
        } as VideoSamplingResultDTO;
    };

    /**
     * Saves a video seek event
     */
    async saveVideoSeekEventAsync(principalId: PrincipalId, videoSeekEventDTO: VideoSeekEventDTO) {

        const { fromSeconds, toSeconds, videoItemCode, videoPlaybackSessionId } = videoSeekEventDTO;
        const { itemId, itemType } = readItemCode(videoItemCode);

        if (itemType !== 'video')
            throw new Error('Wrong item type: ' + itemType);

        await this._ormService
            .createAsync(VideoSeekEvent, {
                creationDate: new Date(),
                fromSeconds: fromSeconds,
                toSeconds: toSeconds,
                userId: principalId.toSQLValue(),
                videoId: itemId,
                videoPlaybackSessionId: videoPlaybackSessionId,
                isForward: fromSeconds <= toSeconds
            });
    }

    /**
     * Gets the max watched seconds // TODO clarify this
     */
    getMaxWatchedSeconds = async (userId: number, videoId: number) => {

        const ads = await this._ormService
            .query(VideoProgressView, { userId, videoId })
            .where('userId', '=', 'userId')
            .and('videoId', '=', 'videoId')
            .getSingle();

        return ads.toSeconds;
    };

    //
    // PRIVATE
    //

    private async _handleSampleMerge(userId: number, videoId: number, videoPlaybackSessionId: number, fromSeconds: number, toSeconds: number) {

        // get old playback samples
        const oldSamples = await this
            ._getVideoPlaybackSamples(userId, videoId, videoPlaybackSessionId);

        // merge samples 
        const currentSample = {
            fromSeconds,
            toSeconds
        } as VideoPlaybackSample;

        const mergedSamples = this._sampleMergeService
            .mergeSamples([currentSample, ...oldSamples]);

        await this._saveMergedSamples(mergedSamples, userId, videoId, videoPlaybackSessionId);

        return { mergedSamples };
    }

    private async _saveMergedSamples(
        mergedSamples: VideoPlaybackSample[],
        userId: number,
        videoId: number,
        videoPlaybackSessionId: number) {

        await this._ormService
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(VideoPlaybackSample)
            .where("videoId = :videoId", { videoId })
            .andWhere("userId = :userId", { userId })
            .execute();

        await this._ormService
            .createMany(VideoPlaybackSample, mergedSamples
                .map(x => ({
                    creationDate: new Date(),
                    fromSeconds: x.fromSeconds,
                    toSeconds: x.toSeconds,
                    userId,
                    videoId,
                    videoPlaybackSessionId
                })));
    }

    private async _handleVideoProgressAsync(userId: number, videoId: number, toSeconds: number, mergedSamples: VideoPlaybackSample[]) {

        // calucate watched percent
        const watchedPercent = await this
            ._getVideoWatchedPercentAsync(videoId, mergedSamples);

        const isCompleted = watchedPercent > this._config.misc.videoCompletedPercentage;
        const isCompletedBefore = await this._getVideoIsCompletedStateAsync(userId, videoId);
        const isFirstCompletion = isCompleted && !isCompletedBefore;
        const completionDate = isFirstCompletion ? new Date() : undefined;

        // save user video progress bridge
        await this._saveUserVideoProgressBridgeAsync(userId, videoId, watchedPercent, toSeconds, completionDate);

        // if is watched state changed 
        // reward user with episto coins
        if (isFirstCompletion) {

            await this._coinAcquireService
                .acquireVideoWatchedCoinsAsync(userId, videoId);
        }

        return { isFirstCompletion };
    }

    private async _getVideoWatchedPercentAsync(videoId: number, samples: VideoPlaybackSample[]) {

        if (samples.length === 0)
            return 0;

        const video = await this._ormService
            .getRepository(Video)
            .createQueryBuilder('v')
            .where('v.id = :videoId', { videoId })
            .getOneOrFail();

        if (video.lengthSeconds === 0)
            return 0;

        const netWatchedSeconds = samples
            .map(x => x.toSeconds - x.fromSeconds)
            .reduce((prev, curr) => curr + prev);

        return Math.round((netWatchedSeconds / video.lengthSeconds) * 100);
    };

    private async _getVideoPlaybackSamples(userId: number, videoId: number, videoPlaybackSessionId: number) {

        return this._ormService
            .query(VideoPlaybackSample, { userId, videoId, videoPlaybackSessionId })
            .where('videoId', '=', 'videoId')
            .and('userId', '=', 'userId')
            .and('videoPlaybackSessionId', '=', 'videoPlaybackSessionId')
            .getMany();
    }

    private async _saveUserVideoProgressBridgeAsync(
        userId: number,
        videoId: number,
        completedPercentage: number,
        cursorSeconds: number,
        newCompletionDate?: Date) {

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

        await this._ormService
            .getRepository(UserVideoProgressBridge)
            .save({
                id: pbd?.id,
                userId,
                videoId,
                completedPercentage,
                completionDate,
                cursorSeconds
            });
    };

    private async _getVideoIsCompletedStateAsync(userId: number, videoId: number) {

        const pbd = await this._ormService
            .query(UserVideoProgressBridge, { userId, videoId })
            .where('videoId', '=', 'videoId')
            .and('userId', '=', 'userId')
            .getOneOrNull();

        return !!pbd?.completionDate;
    };
}