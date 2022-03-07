import { UserCourseCompletionPrevisionedView } from "../models/views/UserCourseCompletionPrevisionedView";
import { UserCourseProgressView } from "../models/views/UserCourseProgressView";
import { TempomatModeType } from "../shared/types/sharedTypes";
import { MapperService } from "./MapperService";
import { ServiceBase } from "./misc/ServiceBase";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";

export class TempomatService extends ServiceBase {

    private _userCourseBridgeService: UserCourseBridgeService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        courseBridgeServie: UserCourseBridgeService) {

        super(mapperService, ormService);

        this._userCourseBridgeService = courseBridgeServie;
    }

    async setTempomatModeAsync(userId: number, courseId: number, tempomatMode: TempomatModeType) {

        const bridge = await this._userCourseBridgeService
            .getOrFailAsync({
                courseId,
                userId
            });

        await this._userCourseBridgeService
            .updateAsync({
                id: bridge.id,
                tempomatMode
            });
    }

    async getTempomatModeAsync(userId: number, courseId: number) {

        const bridge = await this._userCourseBridgeService
            .getOrFailAsync({
                courseId,
                userId
            });

        return bridge.tempomatMode;
    }

    async calcRecommendedItemsPerDayAsync(userId: number, courseId: number) {

        const previsioned = await this._ormService
            .getRepository(UserCourseCompletionPrevisionedView)
            .findOneOrFail({
                where: {
                    courseId,
                    userId
                }
            });

        const recommendedItemsPerDay = Math
            .ceil(previsioned.previsionedItemsPerDay);

        await this.setRecommendedItemsPerDayAsync(userId, courseId, recommendedItemsPerDay);
    }

    async evaluateUserProgressesAsync() {

        console.log("Evaluating user progresses...");

        const userCourseProgressViews = await this._ormService
            .getRepository(UserCourseProgressView)
            .find();

        for (let index = 0; index < userCourseProgressViews.length; index++) {

            const userCourseProgressView = userCourseProgressViews[index];
            await this.recalculateUserProgressAsync(userCourseProgressView);
        }
    }

    async recalculateUserProgressAsync(userCourseProgressView: UserCourseProgressView) {

        // set new recommended items per day
        await this.recalculateUserRecommendedItemsPerDay(userCourseProgressView)

        // handle lag behind 
        await this.handleLagBehindAsync(userCourseProgressView);
    }

    async recalculateUserRecommendedItemsPerDay(userCourseProgressView: UserCourseProgressView) {

        const { userId, courseId, tempomatMode, recommendedItemsPerDay } = userCourseProgressView;

        console.log(`User ${userId} course ${courseId} is in ${tempomatMode} tempomat mode.`)

        // no recommended item recalc in light mode
        if (tempomatMode === "light") {

            console.log("No new recommended daily item count has been set.");
            return;
        }

        // full recommended item recalc in strict mode
        if (tempomatMode === "strict") {

            await this.setRecommendedItemsPerDayAsync(userId, courseId, recommendedItemsPerDay);
            return;
        }

        // in auto or balanced mode, 
        // recalc by modifying the previsioned completion date 
        if (tempomatMode === "auto" || tempomatMode === "balanced") {

            console.log("TODO auto & balanced mode");
            return;
        }
    }

    async handleLagBehindAsync(userCourseProgressView: UserCourseProgressView) {

        const { courseId, userId, lagBehindPercentage } = userCourseProgressView;

        if (lagBehindPercentage < 35)
            return;

        console.log(`User ${userId} is lagging behind in course ${courseId} by ${lagBehindPercentage}%`);

        // TODO notify user
    }

    async setRecommendedItemsPerDayAsync(userId: number, courseId: number, recommendedItemsPerDay: number) {

        const b = await this._userCourseBridgeService
            .getUserCourseBridgeOrFailAsync(userId, courseId);

        await this._userCourseBridgeService
            .updateAsync({
                id: b.id,
                recommendedItemsPerDay
            });

        console.log(`Recommended daily item count set to ${recommendedItemsPerDay} for user ${userId}.`);
    }
}