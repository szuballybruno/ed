import { UserCourseBridge } from '../models/entity/UserCourseBridge';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { UserCourseProgressView } from '../models/views/UserCourseProgressView';
import { notnull } from '../shared/logic/sharedLogic';
import { TempomatModeType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { addDays, dateDiffInDays, relativeDiffInPercentage } from '../utilities/helpers';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { EventService } from './EventService';
import { LoggerService } from './LoggerService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

type CalculateTempomatValuesArgs = {
    tempomatMode: TempomatModeType,
    originalPrevisionedCompletionDate: Date,
    startDate: Date,
    requiredCompletionDate: Date,
    totalItemCount: number,
    totalCompletedItemCount: number,
    tempomatAdjustmentValue: number,
}

export class TempomatService {

    constructor(
        private _ormService: ORMConnectionService,
        private _loggerService: LoggerService,
        private _eventService: EventService) {
    }

    /**
     * Set tempomat mode 
     */
    async setTempomatModeAsync(principalId: PrincipalId, courseId: Id<'Course'>, tempomatMode: TempomatModeType) {

        const userId = principalId.toSQLValue();

        const bridge = await this._ormService
            .query(UserCourseBridge, { courseId, userId })
            .where('courseId', '=', 'courseId')
            .and('userId', '=', 'userId')
            .getSingle();

        await this._ormService
            .save(UserCourseBridge, {
                id: bridge.id,
                tempomatMode
            });
    }

    /**
     * TODO: Create a logic for adding notifications
     */
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

    /**
     * Temp mode  
     */
    async getTempomatModeAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        const userId = principalId.toSQLValue();

        const bridge = await this._ormService
            .query(UserCourseBridge, { courseId, userId })
            .where('courseId', '=', 'courseId')
            .and('userId', '=', 'userId')
            .getSingle();

        return bridge.tempomatMode;
    }

    /**
     * Get single tempomat calculation data
     */
    async getTempomatCalculationData(userId: Id<'User'>, courseId: number) {

        return await this
            ._ormService
            .query(TempomatCalculationDataView, { courseId, userId })
            .where('courseId', '=', 'courseId')
            .and('userId', '=', 'userId')
            .getSingle();
    }

    /**
     * Gets all tempomat calc datas associated with user 
     */
    async getTempomatCalculationDatasAsync(userId: Id<'User'>) {

        return await this
            ._ormService
            .query(TempomatCalculationDataView, { userId })
            .where('userId', '=', 'userId')
            .getMany();
    }

    /**
     * getAvgLagBehindPercentage
     */
    async getAvgLagBehindPercentage(userId: Id<'User'>) {

        const tempomatCalculationDatas = await this
            .getTempomatCalculationDatasAsync(userId);

        const allLagBehindPercentages = tempomatCalculationDatas
            .map(x => {

                const { lagBehindPercentage } = this
                    .calculateTempomatValues(x);

                return lagBehindPercentage;
            });

        // wtf
        const avgLagBehindPercentage = allLagBehindPercentages
            .reduce((a, b) => a + b, 0) / allLagBehindPercentages.length;

        return { avgLagBehindPercentage };
    }

    /**
     * Calc tempomat values 
     */
    async calculateTempomatValuesAsync(userId: Id<'User'>, courseId: Id<'Course'>) {

        const tempomatCalculationData = await this._ormService
            .query(TempomatCalculationDataView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        return this.calculateTempomatValues(tempomatCalculationData);
    }

    /**
     * Calc tempomat values 
     */
    calculateTempomatValues(opts: CalculateTempomatValuesArgs) {

        const {
            originalPrevisionedCompletionDate,
            totalItemCount,
            totalCompletedItemCount,
            startDate,
            tempomatMode,
            tempomatAdjustmentValue,
            requiredCompletionDate
        } = opts;

        notnull(startDate, 'startDate');

        const previsionedCompletionDate = this
            ._calculatePrevisionedDate(
                originalPrevisionedCompletionDate,
                totalItemCount,
                totalCompletedItemCount,
                startDate,
                tempomatMode,
                tempomatAdjustmentValue
            );

        const { recommendedItemsPerDay, recommendedItemsPerWeek } = this
            ._calculateRecommendedItemsPerDay(
                startDate,
                previsionedCompletionDate,
                requiredCompletionDate,
                totalItemCount
            );

        const lagBehindPercentage = this
            ._calculateLagBehindPercentage(
                startDate,
                requiredCompletionDate
                    ? requiredCompletionDate
                    : originalPrevisionedCompletionDate,
                previsionedCompletionDate
            );

        return {
            previsionedCompletionDate,
            recommendedItemsPerDay,
            recommendedItemsPerWeek,
            originalPrevisionedCompletionDate,
            requiredCompletionDate,
            startDate,
            lagBehindPercentage
        };
    }

    /**
     * ---------------------- PRIVATE FUNCTIONS
     */

    /**
    * Calculates the current previsioned date for every tempomat mode
    * * LIGHT MODE: Push the previsioned day by lag behind days
    *      1. First subtract the START DATE from the ORIGINAL ESTIMATION
    *      2. Then you got the ORIGINAL PREVISIONED LENGTH
    *      3. Then divide the VIDEOS COUNT with the ORIGINAL PREVISIONED LENGTH
    *      4. Then you got the ORIGINAL ESTIMATED VIDEOS PER DAY
    *      5. Then you need the DAYS SPENT FROM START DATE
    *      6. Which you first need to multiply by the ORIGINAL ESTIMATED VIDEOS PER DAY
    *         to get HOW MANY VIDEOS YOU SHOULD HAVE WATCHED BY NOW
    *      7. AND then multiply DAYS SPENT FROM START
    *         DATE by WATCHED VIDEOS FROM START DATE TO CURRENT DATE to get
    *         HOW MANY VIDEOS YOU HAVE WATCHED BY NOW
    *      8. For the last step, you need to subtract the HOW MANY VIDEOS YOU SHOULD HAVE WATCHED BY NOW by
    *         HOW MANY VIDEOS YOU HAVE WATCHED BY NOW to get your LAG BEHIND DAYS COUNT
    *         That LAG BEHIND DAYS COUNT then added to the NEW PREVISIONED COMPLETION DATE so
    *         the PREVISIONED VIDEOS PER DAY remains the same
    *
    * * AUTO, BALANCED MODE: Push the previsioned day LESS then the lag behind
    *      1. ... same steps
    *      2. Plus you need to multiply by the ACTUAL ADJUSTMENT VALUE (e.g. 0.2) that
    *         comes from the PRETEST, so you push the NEW PREVISIONED COMPLETION DATE LESS
    *         then on LIGHT MODE and the PREVISIONED VIDEOS PER DAY will be a little bit HIGHER
    */
    private _calculatePrevisionedDate(
        originalPrevisionedCompletionDate: Date,
        totalItemCount: number,
        totalCompletedItemCount: number,
        startDate: Date,
        tempomatMode: TempomatModeType,
        adjustmentCorrection: number
    ) {

        const originalPrevisionedLength = this
            ._calculateOriginalPrevisionedLength(originalPrevisionedCompletionDate, startDate);

        const originalEstimatedVideosPerDay = this
            ._calculateOriginalEstimatedVideosPerDay(totalItemCount, originalPrevisionedLength);

        const daysSpentFromStartDate = this
            ._calculateDaysSpentFromStartDate(startDate);

        const howManyVideosShouldHaveWatchedByNow = this
            ._calculateHowManyVideosShouldHaveWatchedByNow(originalEstimatedVideosPerDay, daysSpentFromStartDate);

        const lagBehindVideos = this
            ._calculateLagBehindVideos(howManyVideosShouldHaveWatchedByNow, totalCompletedItemCount);

        const lagBehindDays = this
            ._calculateLagBehindDays(lagBehindVideos, originalEstimatedVideosPerDay);

        const newPrevisionedDate = this
            ._calculateNewPrevisionedDateByTempomatMode(tempomatMode, originalPrevisionedCompletionDate, lagBehindDays, adjustmentCorrection);

        this._loggerService.log('CURRENT TEMPOMAT CALCULATION: ');
        this._loggerService.logSecondary(`Start date: ${startDate}`);
        this._loggerService.logSecondary(`Original previsioned completion date: ${originalPrevisionedCompletionDate}`);
        this._loggerService.logSecondary(`Original previsioned length: ${originalPrevisionedLength} days`);
        this._loggerService.logSecondary(`Total item count: ${totalItemCount}`);
        this._loggerService.logSecondary(`Original estimated videos per day: ${originalEstimatedVideosPerDay}`);
        this._loggerService.logSecondary(`Days spent from start date: ${daysSpentFromStartDate}`);
        this._loggerService.logSecondary(`Videos should have watched by now: ${howManyVideosShouldHaveWatchedByNow}`);
        this._loggerService.logSecondary(`Watched videos: ${totalCompletedItemCount}`);
        this._loggerService.logSecondary(`Lag behind: ${lagBehindDays} days`);
        this._loggerService.logSecondary(`Mode: '${tempomatMode}'`);
        this._loggerService.logSecondary(`Adjustment: ${adjustmentCorrection * 100}%`);
        this._loggerService.logSecondary(`New previsoned date: ${newPrevisionedDate}`);

        return newPrevisionedDate;
    }

    /**
     * Calculates the lag behind from three dates. 
     * @returns A positive int percentage when there is lag from
     * the original estimation or null because it cannot be determined
     */
    private _calculateLagBehindPercentage(
        startDate: Date,
        originalPrevisionedCompletionDate: Date,
        newPrevisionedDate: Date
    ) {

        const daysFromStartToOriginalPrevisioned = dateDiffInDays(startDate, originalPrevisionedCompletionDate);
        const daysFromStartToNewPrevisioned = dateDiffInDays(startDate, newPrevisionedDate);

        return Math.ceil(relativeDiffInPercentage(daysFromStartToOriginalPrevisioned, daysFromStartToNewPrevisioned));
    }

    /**
     * Calculates recommended items per day from either the
     * required or the previsioned completion date 
     * because it cannot be determined
     */
    private _calculateRecommendedItemsPerDay(
        startDate: Date,
        currentPrevisionedCompletionDate: Date,
        requiredCompletionDate: Date,
        totalItemsCount: number
    ) {

        let recommendedItemsPerDay = 0;

        // If there is required completion date, calculate
        // recommended items per day from that
        if (requiredCompletionDate) {

            const daysFromStartToRequired = dateDiffInDays(startDate, requiredCompletionDate);
            recommendedItemsPerDay = Math.ceil(totalItemsCount / daysFromStartToRequired);
        } else {

            const daysFromStartToCurrentPrevisioned = dateDiffInDays(startDate, currentPrevisionedCompletionDate);
            recommendedItemsPerDay = Math.ceil(totalItemsCount / daysFromStartToCurrentPrevisioned);
        }

        const recommendedItemsPerWeek = recommendedItemsPerDay * 7;

        return { recommendedItemsPerDay, recommendedItemsPerWeek };
    }

    private _calculateOriginalPrevisionedLength(originalPrevisionedCompletionDate: Date, startDate: Date) {

        return dateDiffInDays(startDate, originalPrevisionedCompletionDate);
    }

    private _calculateOriginalEstimatedVideosPerDay(
        videosCount: number,
        originalPrevisionedLength: number
    ) {

        if (!originalPrevisionedLength)
            throw new Error('Pretest hasn\'t been done');

        return videosCount / originalPrevisionedLength;
    }

    private _calculateDaysSpentFromStartDate(startDate: Date) {

        const currentDate = new Date(Date.now());

        return Math.abs(dateDiffInDays(currentDate, startDate));
    }

    private _calculateHowManyVideosShouldHaveWatchedByNow(
        originalEstimatedVideosPerDay: number,
        daysSpentFromStartDate: number
    ) {

        return originalEstimatedVideosPerDay * daysSpentFromStartDate;
    }

    private _calculateLagBehindVideos(
        howManyVideosShouldHaveWatchedByNow: number,
        watchedVideos: number
    ) {

        return howManyVideosShouldHaveWatchedByNow - watchedVideos;
    }

    private _calculateLagBehindDays(lagBehindVideos: number, originalEstimatedVideosPerDay: number) {

        return lagBehindVideos / originalEstimatedVideosPerDay;
    }

    private _calculateNewPrevisionedDateByTempomatMode(
        tempomatMode: TempomatModeType,
        originalPrevisionedCompletionDate: Date,
        lagBehindDays: number,
        adjustmentCorrection?: number
    ) {

        const getNewPrevisionedDate = () => {
            switch (tempomatMode as TempomatModeType) {

                case 'light':

                    return addDays(originalPrevisionedCompletionDate, lagBehindDays);
                case 'balanced':

                    if (!adjustmentCorrection)
                        throw new Error('No adjustment correction provided');

                    return addDays(originalPrevisionedCompletionDate, lagBehindDays * adjustmentCorrection);
                case 'strict':

                    return originalPrevisionedCompletionDate;
                case 'auto':

                    if (!adjustmentCorrection)
                        throw new Error('No adjustment correction provided');

                    return addDays(originalPrevisionedCompletionDate, lagBehindDays * adjustmentCorrection);
                default:
                    throw new Error('Tempomat mode doesn\'t exists');
            }
        };

        const newPrevisionedDate = getNewPrevisionedDate();

        return newPrevisionedDate >= originalPrevisionedCompletionDate
            ? newPrevisionedDate
            : originalPrevisionedCompletionDate;
    }
}