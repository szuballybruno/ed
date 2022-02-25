import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { UserVideoProgressBridge } from "../models/entity/UserVideoProgressBridge";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { VideoProgressView } from "../models/views/VideoProgressView";
import { VideoPlaybackSampleDTO } from "../shared/dtos/VideoPlaybackSampleDTO";
import { VideoSamplingResultDTO } from "../shared/dtos/VideoSamplingResultDTO";
import { CoinAcquireService } from "./CoinAcquireService";
import { MapperService } from "./MapperService";
import { readItemCode } from "./misc/encodeService";
import { ServiceBase } from "./misc/ServiceBase";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserSessionActivityService } from "./UserSessionActivityService";
import { VideoPlaybackSampleService } from "./VideoPlaybackSampleService";

export class PlaybackService extends ServiceBase {

    private _videoPlaybackSampleService: VideoPlaybackSampleService;
    private _coinAcquireService: CoinAcquireService;
    private _userSessionActivityService: UserSessionActivityService;

    // TODO 5% is a very low number only for development
    private VIDEO_COMPLETED_PERCENTAGE = 5;

    constructor(
        mapperService: MapperService,
        ormService: ORMConnectionService,
        videoPlaybackSampleService: VideoPlaybackSampleService,
        coinAcquireService: CoinAcquireService,
        userSessionActivityService: UserSessionActivityService) {

        super(mapperService, ormService);

        this._userSessionActivityService = userSessionActivityService;
        this._coinAcquireService = coinAcquireService;
        this._videoPlaybackSampleService = videoPlaybackSampleService;
    }

    saveVideoPlaybackSample = async (userId: number, dto: VideoPlaybackSampleDTO) => {

        const currentBridge = await this._ormService
            .getRepository(UserCourseBridge)
            .findOneOrFail({
                where: {
                    userId,
                    isCurrent: true
                }
            });

        if (!currentBridge.currentItemCode)
            throw new Error("Course has no current item!");

        const { itemId: videoId, itemType } = readItemCode(currentBridge.currentItemCode);
        if (itemType !== "video")
            throw new Error("Current item is not of type: video!");

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

        const isCompleted = watchedPercent > this.VIDEO_COMPLETED_PERCENTAGE;
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
            .saveUserSessionActivityAsync(userId, "video");

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

        const repo = this._ormService
            .getRepository(UserVideoProgressBridge);

        const pbd = await repo
            .findOne({
                videoId: videoId,
                userId: userId
            });

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

        await repo
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
            })

        return ads.toSeconds;
    }

    getVideoIsCompletedStateAsync = async (userId: number, videoId: number) => {

        const repo = this._ormService
            .getRepository(UserVideoProgressBridge);

        const pbd = await repo
            .findOne({
                videoId: videoId,
                userId: userId
            });

        return !!pbd?.completionDate;
    }
}