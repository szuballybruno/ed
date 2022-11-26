import { UserCourseBridge } from '../models/entity/misc/UserCourseBridge';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { UserCourseProgressView } from '../models/views/UserCourseProgressView';
import { instantiate } from '@episto/commonlogic';
import { TempomatModeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { addDays, dateDiffInDays, getArrayAverage, relativeDiffInPercentage } from '../utilities/helpers';
import { PrincipalId } from '@episto/x-core';
import { AuthorizationService } from './AuthorizationService';
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


export type CalculatedTempomatValueType = {
    previsionedCompletionDate: Date,
    recommendedItemsPerDay: number,
    recommendedItemsPerWeek: number,
    originalPrevisionedCompletionDate: Date,
    requiredCompletionDate: Date,
    startDate: Date,
    lagBehindPercentage: number
}

export interface CalculatedTempomatValueTypeWithUserId extends CalculatedTempomatValueType {
    userId: Id<'User'>
}


export class TempomatService {

    private _authorizationService: AuthorizationService;

    constructor(
        private _ormService: ORMConnectionService,
        private _loggerService: LoggerService,
        private _eventService: EventService,
        private authorizationService: AuthorizationService) {

        this._authorizationService = authorizationService;
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
            .logScoped('TEMPOMAT', `User ${userId} is lagging behind in course ${courseId} by ${lagBehindPercentage}% Sending notification...`);

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
    async getTempomatCalculationDataAsync(userId: Id<'User'>, courseId: number) {

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
 * Calc tempomat values for one users one course
 */
    async calculateTempomatValuesAsync(userId: Id<'User'>, courseId: Id<'Course'>) {

        const tempomatCalculationData = await this._ormService
            .query(TempomatCalculationDataView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        return this
            .calculateTempomatValues(tempomatCalculationData);
    }

    /**
     * getAvgLagBehindPercentage
     */
    async getAvgLagBehindPercentageAsync(userId: Id<'User'>) {

        const tempomatCalculationDatas = await this
            .getTempomatCalculationDatasAsync(userId);

        if (tempomatCalculationDatas.length === 0)
            return null;

        const allLagBehindPercentages = tempomatCalculationDatas
            .map(x => {

                const tempomatValues = this
                    .calculateTempomatValues(x);

                return tempomatValues?.lagBehindPercentage!;
            });

        if (allLagBehindPercentages.some(x => x === null))
            return null;

        // calculates the average lag beghind from all started course
        const avgLagBehindPercentage = allLagBehindPercentages
            .reduce((a, b) => a + b, 0) / allLagBehindPercentages.length;

        return avgLagBehindPercentage;
    }

    getLagBehindPercentageFromTempomatCalculationData(tempomatCalculationDataViews: TempomatCalculationDataView[]) {

        return tempomatCalculationDataViews
            .map(x => {

                const newPrevisionedCompletionDate = this
                    .calculatePrevisionedDate(
                        x.originalPrevisionedCompletionDate,
                        x.totalItemCount,
                        x.totalCompletedItemCount,
                        x.startDate,
                        x.tempomatMode,
                        x.tempomatAdjustmentValue
                    );

                const lagBehindPercentage = this
                    ._calculateLagBehindPercentage(
                        x.startDate,
                        x.requiredCompletionDate
                            ? x.requiredCompletionDate
                            : x.originalPrevisionedCompletionDate,
                        newPrevisionedCompletionDate
                    );

                return lagBehindPercentage;
            });
    }

    /*
    * Calc the average lag beghind from all started course
    */
    getAvgLagBehindPercentage(tempomatCalculationDatas: TempomatCalculationDataView[]) {

        return tempomatCalculationDatas
            .groupBy(x => x.userId)
            .map(x => {

                const lagBehindAvg = this
                    .getLagBehindPercentageFromTempomatCalculationData(x.items);

                const filteredLagBehindAvgs = lagBehindAvg
                    .filter(x => x)
                    .filter(x => x !== 0);

                return {
                    userId: x.first.userId,
                    lagBehindAvg: getArrayAverage(lagBehindAvg)
                };
            });
    }



    calculateCompanyTempomatValues(tempomatCalculationDataViews: TempomatCalculationDataView[]): CalculatedTempomatValueTypeWithUserId[] {
        return tempomatCalculationDataViews
            .map(x => ({
                userId: x.userId,
                ...this
                    .calculateTempomatValues(x)
            }));
    }

    calculateCompanyLagBehinds(companyTempomatValues: CalculatedTempomatValueTypeWithUserId[]) {
        return companyTempomatValues
            .filter(x => (x !== null && x.lagBehindPercentage !== null))
            .map(x => x.lagBehindPercentage);
    }

    /**
     * Calc tempomat values for one users one course
     */
    calculateTempomatValues({
        originalPrevisionedCompletionDate,
        totalItemCount,
        totalCompletedItemCount,
        startDate,
        tempomatMode,
        tempomatAdjustmentValue,
        requiredCompletionDate
    }: CalculateTempomatValuesArgs): CalculatedTempomatValueType {

        try {

            const previsionedCompletionDate = this
                .calculatePrevisionedDate(
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
                    (() => {

                        if (requiredCompletionDate)
                            return requiredCompletionDate;

                        if (!requiredCompletionDate && originalPrevisionedCompletionDate)
                            return originalPrevisionedCompletionDate;

                        return addDays(startDate, totalItemCount / 6);
                    })(),
                    previsionedCompletionDate
                );

            return instantiate<CalculatedTempomatValueType>({
                previsionedCompletionDate,
                recommendedItemsPerDay,
                recommendedItemsPerWeek,
                originalPrevisionedCompletionDate,
                requiredCompletionDate,
                startDate,
                lagBehindPercentage
            });
        }
        catch (e: any) {

            throw new Error(`Tempomat calculation error! Msg: ${e.message}`);
        }
    }

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
     * * AUTO, BALANCED MODE: Push the previsioned day LESS than the lag behind
     *      1. ... same steps
     *      2. Plus you need to multiply by the ACTUAL ADJUSTMENT VALUE (e.g. 0.2) that
     *         comes from the PRETEST, so you push the NEW PREVISIONED COMPLETION DATE LESS
     *         than on LIGHT MODE and the PREVISIONED VIDEOS PER DAY will be a bit HIGHER
     */
    calculatePrevisionedDate(
        originalPrevisionedCompletionDate: Date | null,
        totalItemCount: number,
        totalCompletedItemCount: number,
        startDate: Date,
        tempomatMode: TempomatModeType,
        adjustmentCorrection: number
    ) {
        const originalPrevisionedLength = originalPrevisionedCompletionDate
            ? this._calculateOriginalPrevisionedLength(
                originalPrevisionedCompletionDate,
                startDate)
            : null;

        // If there is no pretest so no original previsioned length
        // use 6 items per day as fallback value
        const originalEstimatedVideosPerDay = originalPrevisionedLength
            ? totalItemCount / originalPrevisionedLength
            : 6;

        const daysSpentFromStartDate = this
            ._calculateDaysSpentFromStartDate(startDate);

        const howManyVideosShouldHaveWatchedByNow = this
            ._calculateHowManyVideosShouldHaveWatchedByNow(originalEstimatedVideosPerDay, daysSpentFromStartDate, totalItemCount);

        const lagBehindVideos = this
            ._calculateLagBehindVideos(howManyVideosShouldHaveWatchedByNow, totalCompletedItemCount);

        const lagBehindDays = this
            ._calculateLagBehindDays(lagBehindVideos, originalEstimatedVideosPerDay);

        // if there is no pretest so no original previsioned completion date
        // return a rough estimation with 6 videos a day
        const newPrevisionedDate = originalPrevisionedCompletionDate
            ? this._calculateNewPrevisionedDateByTempomatMode(tempomatMode, originalPrevisionedCompletionDate, lagBehindDays, adjustmentCorrection)
            : addDays(startDate, totalItemCount / 6);

        this._loggerService.logScoped('TEMPOMAT', 'CURRENT TEMPOMAT CALCULATION: ');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `Start date: ${startDate}`);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `Original previsioned completion date: ${originalPrevisionedCompletionDate}`);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `Original previsioned length: ${originalPrevisionedLength} days`);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `Total item count: ${totalItemCount}`);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `Original estimated videos per day: ${originalEstimatedVideosPerDay}`);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `Days spent from start date: ${daysSpentFromStartDate}`);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `Videos should have watched by now: ${howManyVideosShouldHaveWatchedByNow}`);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `Watched videos: ${totalCompletedItemCount}`);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `Lag behind: ${lagBehindDays} days`);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `Mode: '${tempomatMode}'`);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `Adjustment: ${adjustmentCorrection * 100}%`);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', `New previsoned date: ${newPrevisionedDate}`);

        return newPrevisionedDate;
    }

    calculateLagBehindDaysWithPretest(
        originalPrevisionedCompletionDate: Date | null,
        totalItemCount: number,
        totalCompletedItemCount: number,
        startDate: Date
    ) {
        if (!originalPrevisionedCompletionDate)
            throw new Error('Previsioned length is null, this could mean theres a problem with the prequiz or a view depending on it.');

        const originalPrevisionedLength = originalPrevisionedCompletionDate
            ? this._calculateOriginalPrevisionedLength(
                originalPrevisionedCompletionDate,
                startDate
            )
            : null;

        const originalEstimatedVideosPerDay = originalPrevisionedLength
            ? totalItemCount / originalPrevisionedLength
            : 6;

        const daysSpentFromStartDate = this
            ._calculateDaysSpentFromStartDate(startDate);

        const howManyVideosShouldHaveWatchedByNow = this
            ._calculateHowManyVideosShouldHaveWatchedByNow(originalEstimatedVideosPerDay, daysSpentFromStartDate, totalItemCount);

        const lagBehindVideos = this
            ._calculateLagBehindVideos(howManyVideosShouldHaveWatchedByNow, totalCompletedItemCount);

        const lagBehindDays = this
            ._calculateLagBehindDays(lagBehindVideos, originalEstimatedVideosPerDay);

        return lagBehindDays;
    }

    /**
     * ---------------------- PRIVATE FUNCTIONS
     */

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

        // If there is required completion date, calculate
        // recommended items per day from that
        if (requiredCompletionDate) {

            const daysFromStartToRequired = dateDiffInDays(startDate, requiredCompletionDate);
            const recommendedItemsPerDay = Math.ceil(totalItemsCount / daysFromStartToRequired);
            const recommendedItemsPerWeek = recommendedItemsPerDay * 7;

            return {
                recommendedItemsPerDay,
                recommendedItemsPerWeek
            };
        }

        // If there is no required completion date, calculate
        // recommended items per day from previsioned completion date
        if (!requiredCompletionDate && currentPrevisionedCompletionDate) {

            const daysFromStartToCurrentPrevisioned = dateDiffInDays(startDate, currentPrevisionedCompletionDate);
            const recommendedItemsPerDay = Math.ceil(totalItemsCount / daysFromStartToCurrentPrevisioned);
            const recommendedItemsPerWeek = recommendedItemsPerDay * 7;

            return {
                recommendedItemsPerDay,
                recommendedItemsPerWeek
            };
        }

        // fallback value if there is no pretest
        return {
            recommendedItemsPerDay: 6,
            recommendedItemsPerWeek: 41
        };
    }

    private _calculateOriginalPrevisionedLength(originalPrevisionedCompletionDate: Date, startDate: Date) {

        return dateDiffInDays(startDate, originalPrevisionedCompletionDate);
    }

    private _calculateDaysSpentFromStartDate(startDate: Date) {

        const currentDate = new Date(Date.now());

        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', '-------------------------------------------------------');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Calculating daysSpentFromStartDate...');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input startDate: ' + startDate);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Current date: ' + currentDate);

        const daysSpentFromStartDate = Math.abs(dateDiffInDays(currentDate, startDate))

        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', '-------------------------------------------------------');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Days spent from start date: ' + daysSpentFromStartDate);

        return daysSpentFromStartDate;
    }

    private _calculateHowManyVideosShouldHaveWatchedByNow(
        originalEstimatedVideosPerDay: number,
        daysSpentFromStartDate: number,
        totalCourseItemCount: number
    ) {

        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', '-------------------------------------------------------');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Calculating howManyVideosShouldHaveWatchedByNow...');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input originalEstimatedVideosPerDay: ' + originalEstimatedVideosPerDay);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input daysSpentFromStartDate: ' + daysSpentFromStartDate);

        const howManyVideosShouldHaveWatchedByNow = (() => {

            const videosShouldHaveWatchedByNow = originalEstimatedVideosPerDay * daysSpentFromStartDate

            if (videosShouldHaveWatchedByNow > totalCourseItemCount) {
                return totalCourseItemCount;
            }

            return videosShouldHaveWatchedByNow;
        })();

        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', '-------------------------------------------------------');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'How many videos should have watched by now: ' + daysSpentFromStartDate);

        return howManyVideosShouldHaveWatchedByNow;
    }

    private _calculateLagBehindVideos(
        howManyVideosShouldHaveWatchedByNow: number,
        watchedVideos: number
    ) {

        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', '-------------------------------------------------------');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Calculating new lagBehindVideos...');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input howManyVideosShouldHaveWatchedByNow: ' + howManyVideosShouldHaveWatchedByNow);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input watchedVideos: ' + watchedVideos);

        const lagBehindVideos = howManyVideosShouldHaveWatchedByNow - watchedVideos

        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', '-------------------------------------------------------');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Lag behind videos: ' + lagBehindVideos);

        return lagBehindVideos;
    }

    private _calculateLagBehindDays(
        lagBehindVideos: number,
        originalEstimatedVideosPerDay: number
    ) {

        const currentDate = new Date(Date.now());

        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', '-------------------------------------------------------');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Calculating new lagBehindDays...');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input lagBehindVideos: ' + lagBehindVideos);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input originalEstimatedVideosPerDay: ' + originalEstimatedVideosPerDay);
        // this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input originalPrevisionedCompletionDate: ' + originalPrevisionedCompletionDate);

        // TODO: REFACTOR IN PROGRESS
        const lagBehindDays = (() => {

            return lagBehindVideos / originalEstimatedVideosPerDay

        })()

        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', '-------------------------------------------------------');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Lag behind days: ' + lagBehindDays);

        return lagBehindDays;
    }

    private _calculateNewPrevisionedDateByTempomatMode(
        tempomatMode: TempomatModeType,
        originalPrevisionedCompletionDate: Date,
        lagBehindDays: number,
        adjustmentCorrection?: number
    ) {

        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', '-------------------------------------------------------');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Calculating new previsionedDate...');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input tempomatMode: ' + tempomatMode);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input originalPrevisionedCompletionDate: ' + originalPrevisionedCompletionDate);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input lagBehindDays: ' + lagBehindDays);
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'Input adjustmentCorrection: ' + adjustmentCorrection);

        const newPrevisionedDate = (() => {
            switch (tempomatMode as TempomatModeType) {

                case 'light':

                    return addDays(originalPrevisionedCompletionDate, lagBehindDays);
                case 'balanced':

                    if (!adjustmentCorrection || adjustmentCorrection === 0)
                        throw new Error('No adjustment correction provided');

                    return addDays(originalPrevisionedCompletionDate, lagBehindDays * adjustmentCorrection);
                case 'strict':

                    // THIS IS BAD BECAUSE IT CAN BE SMALLER THAN THE CURRENT DATE
                    // --> IF CURRENT DATE > ORIG.PREV.DATE --> NPV should be
                    // CURRENT DATE + ACTUAL VIDEOS PER DAY -> THATS THE REAL VALUE
                    return originalPrevisionedCompletionDate;
                case 'auto':

                    if (!adjustmentCorrection || adjustmentCorrection === 0)
                        throw new Error('No adjustment correction provided');

                    return addDays(originalPrevisionedCompletionDate, lagBehindDays * adjustmentCorrection);
                default:
                    throw new Error('Tempomat mode doesn\'t exists');
            }
        })();

        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', '-------------------------------------------------------');
        this._loggerService.logScoped('TEMPOMAT', 'SECONDARY', 'New previsioned date: ' + newPrevisionedDate);

        return newPrevisionedDate >= originalPrevisionedCompletionDate
            ? newPrevisionedDate
            : originalPrevisionedCompletionDate;
    }
}
