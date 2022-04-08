import { UserVideoProgressBridge } from '../models/entity/UserVideoProgressBridge';
import { VideoPlaybackSample } from '../models/entity/VideoPlaybackSample';
import { VideoProgressView } from '../models/views/VideoProgressView';
import { VideoPlaybackSampleDTO } from '../shared/dtos/VideoPlaybackSampleDTO';
import { VideoSamplingResultDTO } from '../shared/dtos/VideoSamplingResultDTO';
import { CoinAcquireService } from './CoinAcquireService';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './sqlServices/ORMConnectionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { UserSessionActivityService } from './UserSessionActivityService';
import { VideoPlaybackSampleService } from './VideoPlaybackSampleService';

export class PlaybackService extends ServiceBase {

    private _videoPlaybackSampleService: VideoPlaybackSampleService;
    private _coinAcquireService: CoinAcquireService;
    private _userSessionActivityService: UserSessionActivityService;
    private _courseBridgeService: UserCourseBridgeService;
    private _config: GlobalConfiguration;

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

    saveVideoPlaybackSample = async (userId: number, dto: VideoPlaybackSampleDTO) => {

        const currentItemCode = await this._courseBridgeService
            .getCurrentItemCodeOrFailAsync(userId);

        const { itemId: videoId, itemType } = readItemCode(currentItemCode);
        if (itemType !== 'video')
            throw new Error('Current item is not of type: video!');

        await this._ormService
            .getRepository(VideoPlaybackSample)
            .insert({
                videoId: videoId,
                userId: userId,
                fromSeconds: dto.fromSeconds,
                toSeconds: dto.toSeconds
            });

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
            .saveUserSessionActivityAsync(userId, 'video');

        return {
            isWatchedStateChanged: isFirstCompletion,
            maxWathcedSeconds
        } as VideoSamplingResultDTO;
    }

    saveUserVideoProgressBridgeAsync = async (
        userId: number,
        videoId: number,
        completedPercentage: number,
        cursorSeconds: number,
        newCompletionDate?: Date) => {

        const pbd = await this._ormService
            .getOneOrNull(UserVideoProgressBridge,
                [
                    ['WHERE', 'videoId', '=', 'videoId'],
                    ['AND', 'userId', '=', 'userId']
                ],
                { videoId, userId });

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
    }

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
    }

    getVideoIsCompletedStateAsync = async (userId: number, videoId: number) => {

        const pbd = await this._ormService
            .getOneOrNull(UserVideoProgressBridge,
                [
                    ['WHERE', 'videoId', '=', 'videoId'],
                    ['AND', 'userId', '=', 'userId']
                ],
                { userId, videoId });

        return !!pbd?.completionDate;
    }
}