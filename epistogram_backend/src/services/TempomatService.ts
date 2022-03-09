import { UserCourseCompletionCurrentView } from "../models/views/UserCourseCompletionCurrentView";
import { UserCourseCompletionOriginalEstimationView } from "../models/views/UserCourseCompletionOriginalEstimationView";
import { UserCourseProgressView } from "../models/views/UserCourseProgressView";
import { UserTempomatAdjustmentValueView } from "../models/views/UserTempomatAdjustmentValueView";
import { TempomatModeType } from "../shared/types/sharedTypes";
import { LoggerService } from "./LoggerService";
import { MapperService } from "./MapperService";
import { ServiceBase } from "./misc/ServiceBase";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { TaskLockService } from "./TaskLockService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";

export class TempomatService extends ServiceBase {

    private _userCourseBridgeService: UserCourseBridgeService;
    private _taskLockService: TaskLockService;
    private _loggerService: LoggerService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        courseBridgeServie: UserCourseBridgeService,
        taskLockService: TaskLockService,
        loggerService: LoggerService) {

        super(mapperService, ormService);

        this._loggerService = loggerService;
        this._taskLockService = taskLockService;
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

        this._loggerService.log("------- Evaluating user progresses... -------");

        // acquire task lock 
        this._loggerService.log("-- Acquireing task lock... ");

        const isLockAcquired = await this._taskLockService
            .acquireTaskLockAsync("user_progress_evaluation");

        if (!isLockAcquired) {

            this._loggerService.log("-- Failed to acquire task lock, another process is currently locking this task.");
            this._loggerService.log("-- Job aborted.");
            return;
        }

        try {

            this._loggerService.log("-- Task lock acquired successfully.");

            // get all user progresses and handle them accordingly 
            const userCourseProgressViews = await this._ormService
                .getRepository(UserCourseProgressView)
                .find();

            for (let index = 0; index < userCourseProgressViews.length; index++) {

                const userCourseProgressView = userCourseProgressViews[index];
                const { courseId, userId } = userCourseProgressView;

                this._loggerService.log(`USER PROGRESS EVAL: userId: ${userId} courseId: ${courseId}`);

                await this.recalculateUserProgressAsync(userCourseProgressView);
            }
        }
        finally {

            try {

                await this._taskLockService
                    .dissolveLockAsync("user_progress_evaluation");
            }
            catch (e: any) {

                throw new Error("Fatal error, task lock failed to dissolve! " + e?.message);
            }
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

        const adjustmentThresholdPercentage = adjustmentValue.actualAdjustmentValue;
        const allowedStretchPercetage = Math.min(adjustmentThresholdPercentage, lagBehindPercentage);

        const currentView = await this._ormService
            .getRepository(UserCourseCompletionCurrentView)
            .findOneOrFail({
                where: {
                    courseId,
                    userId
                }
            });

        const adjustmentDays = Math.ceil(currentView.previsionedLengthDays / 100.0 * allowedStretchPercetage);
        const newDurationDays = currentView.previsionedLengthDays + adjustmentDays;
        const newCompletionDate = currentView.startDate.addDays(newDurationDays);

        this._loggerService.log(`TEMPOMAT ADJUSTMENT: `);
        this._loggerService.log(`-- Lag behind: ${lagBehindPercentage}%`);
        this._loggerService.log(`-- Mode: '${tempomatMode}'`);
        this._loggerService.log(`-- Threshold: ${adjustmentThresholdPercentage}%`);
        this._loggerService.log(`-- Applied adjustment: ${allowedStretchPercetage}%`);
        this._loggerService.log(`-- Adjustment days: +${adjustmentDays}`);
        this._loggerService.log(`-- New previsoned length: ${newDurationDays} days`);

        await this.setPrevisionedScheduleAsync(
            userId,
            courseId,
            newCompletionDate);
    }

    async handleLagBehindAsync(userCourseProgressView: UserCourseProgressView) {

        const { courseId, userId, lagBehindPercentage } = userCourseProgressView;

        if (lagBehindPercentage < 35)
            return;

        this._loggerService.log(`User ${userId} is lagging behind in course ${courseId} by ${lagBehindPercentage}%`);

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