import { UserCourseCompletionCurrentView } from '../models/views/UserCourseCompletionCurrentView';
import { UserCourseCompletionOriginalEstimationView } from '../models/views/UserCourseCompletionOriginalEstimationView';
import { UserCourseProgressView } from '../models/views/UserCourseProgressView';
import { UserTempomatAdjustmentValueView } from '../models/views/UserTempomatAdjustmentValueView';
import { TempomatModeType } from '../shared/types/sharedTypes';
import { PrincipalId } from '../utilities/ActionParams';
import { EventService } from './EventService';
import { LoggerService } from './LoggerService';
import { MapperService } from './MapperService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class TempomatService extends ServiceBase {

    private _userCourseBridgeService: UserCourseBridgeService;
    private _loggerService: LoggerService;
    private _eventService: EventService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        courseBridgeServie: UserCourseBridgeService,
        loggerService: LoggerService,
        eventService: EventService) {

        super(mapperService, ormService);

        this._eventService = eventService;
        this._loggerService = loggerService;
        this._userCourseBridgeService = courseBridgeServie;
    }

    async setTempomatModeAsync(principalId: PrincipalId, courseId: number, tempomatMode: TempomatModeType) {

        const userId = principalId.toSQLValue();

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

    async getTempomatModeAsync(principalId: PrincipalId, courseId: number) {

        const userId = principalId.toSQLValue();

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

        this._loggerService.log('------- Evaluating user progresses... -------');

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

    async recalculateUserProgressAsync(userCourseProgressView: UserCourseProgressView) {

        try {

            // set new recommended items per day
            await this.recalculateUserRecommendedItemsPerDay(userCourseProgressView);

            // handle lag behind 
            await this.handleLagBehindAsync(userCourseProgressView);
        }
        catch (e: any) {

            console.error(e);
        }
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

        const isPositiveAdjustment = lagBehindPercentage >= 0;
        const adjustmentThresholdPercentage = adjustmentValue.actualAdjustmentValue;
        const allowedStretchPercetage = isPositiveAdjustment
            ? Math.min(adjustmentThresholdPercentage, lagBehindPercentage)
            : Math.max(-1 * adjustmentThresholdPercentage, lagBehindPercentage);

        const currentView = await this._ormService
            .getRepository(UserCourseCompletionCurrentView)
            .findOneOrFail({
                where: {
                    courseId,
                    userId
                }
            });

        const adjustmentDaysFraction = currentView.previsionedLengthDays / 100.0 * allowedStretchPercetage;
        const adjustmentDays = isPositiveAdjustment
            ? Math.ceil(adjustmentDaysFraction)
            : Math.floor(adjustmentDaysFraction);
        const newDurationDays = currentView.previsionedLengthDays + adjustmentDays;
        const newCompletionDate = currentView.startDate.addDays(newDurationDays);

        this._loggerService.log('TEMPOMAT ADJUSTMENT: ');
        this._loggerService.logSecondary(`Lag behind: ${lagBehindPercentage}%`);
        this._loggerService.logSecondary(`Mode: '${tempomatMode}'`);
        this._loggerService.logSecondary(`Threshold: ${adjustmentThresholdPercentage}%`);
        this._loggerService.logSecondary(`Applied adjustment: ${allowedStretchPercetage}%`);
        this._loggerService.logSecondary(`Adjustment days: ${isPositiveAdjustment ? '+' : ''}${adjustmentDays}`);
        this._loggerService.logSecondary(`New previsoned length: ${newDurationDays} days`);

        await this.setPrevisionedScheduleAsync(
            userId,
            courseId,
            newCompletionDate);
    }

    async handleLagBehindAsync(userCourseProgressView: UserCourseProgressView) {

        const { courseId, userId, lagBehindPercentage } = userCourseProgressView;

        if (lagBehindPercentage < 35)
            return;

        this._loggerService
            .log(`User ${userId} is lagging behind in course ${courseId} by ${lagBehindPercentage}% Sending notification...`);

        await this._eventService
            .addLagBehindNotificationEventAsync(userId, {
                lagBehindPercentage
            });
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