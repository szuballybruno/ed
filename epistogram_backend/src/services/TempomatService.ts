import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { UserCourseCompletionOriginalEstimationView } from "../models/views/UserCourseCompletionOriginalEstimationView";
import { UserCourseCompletionCurrentView } from "../models/views/UserCourseCompletionCurrentView";
import { UserCourseProgressView } from "../models/views/UserCourseProgressView";
import { UserTempomatAdjustmentValueView } from "../models/views/UserTempomatAdjustmentValueView";
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

    async calcOriginalPrevisionedScheduleAsync(userId: number, courseId: number) {

        const originalEstimation = await this._ormService
            .getRepository(UserCourseCompletionOriginalEstimationView)
            .findOneOrFail({
                where: {
                    courseId,
                    userId
                }
            });

        await this.setPrevisionedScheduleAsync(
            userId,
            courseId,
            originalEstimation.previsionedCompletionDate);
    }

    async evaluateUserProgressesAsync() {

        console.log("------- Evaluating user progresses... -------");

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

        const { userId, courseId, tempomatMode, lagBehindPercentage } = userCourseProgressView;

        const adjustmentValue = await this._ormService
            .getRepository(UserTempomatAdjustmentValueView)
            .findOneOrFail({
                where: {
                    courseId,
                    userId
                }
            });

        console.log(`User ${userId} course ${courseId} is in '${tempomatMode}' tempomat mode.`);

        const adjustmentThresholdPercentage = adjustmentValue.actualAdjustmentValue;
        const targetStretchPercentage = Math.min(100, lagBehindPercentage * 1.05);
        const allowedStretchPercetage = Math.min(adjustmentThresholdPercentage, targetStretchPercentage);

        console.log(`Adjustment threshold percentage: ${adjustmentThresholdPercentage}%`);
        console.log(`Adjustment target percentage: ${targetStretchPercentage}%`);
        console.log(`Adjustment percentage: ${allowedStretchPercetage}%`);

        const currentView = await this._ormService
            .getRepository(UserCourseCompletionCurrentView)
            .findOneOrFail({
                where: {
                    courseId,
                    userId
                }
            });

        const adjustmentDays = currentView.previsionedLengthDays / 100.0 * allowedStretchPercetage;
        const newDurationDays = Math.ceil(currentView.previsionedLengthDays + adjustmentDays);
        const newCompletionDate = currentView.startDate.addDays(newDurationDays);

        console.log(`Adjustment days: ${adjustmentDays}`);
        console.log(`Duration days ${currentView.previsionedLengthDays} -> ${newDurationDays}`);
        console.log(`Date ${currentView.previsionedCompletionDate} -> ${newCompletionDate}`);

        await this.setPrevisionedScheduleAsync(
            userId,
            courseId,
            newCompletionDate);
    }

    async handleLagBehindAsync(userCourseProgressView: UserCourseProgressView) {

        const { courseId, userId, lagBehindPercentage } = userCourseProgressView;

        if (lagBehindPercentage < 35)
            return;

        console.log(`User ${userId} is lagging behind in course ${courseId} by ${lagBehindPercentage}%`);

        // TODO notify user
    }

    async setPrevisionedScheduleAsync(
        userId: number,
        courseId: number,
        previsionedCompletionDate: Date) {

        const b = await this._userCourseBridgeService
            .getUserCourseBridgeOrFailAsync(userId, courseId);

        await this._userCourseBridgeService
            .updateAsync({
                id: b.id,
                previsionedCompletionDate
            });
    }
}