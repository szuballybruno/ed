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
    previsionedCompletionDate: Date | null,
    recommendedItemsPerDay: number,
    recommendedItemsPerWeek: number,
    originalPrevisionedCompletionDate: Date,
    requiredCompletionDate: Date,
    startDate: Date,
    relativeUserPaceDiff: number
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
     * Calculates the average relative pace of the
     * user for every started course. 
     * 
     * e.g.: Course 1: 30%, Course 2: 60% means
     * that the user is 45% faster than the estimated
     * or required tempo.
     */
    async getAvgRelativeUserPaceDiffAsync(userId: Id<'User'>) {

        const tempomatCalculationDatas = await this
            .getTempomatCalculationDatasAsync(userId);

        if (tempomatCalculationDatas.length === 0)
            return null;

        const allRelativeUserPaces = tempomatCalculationDatas
            .map(x => {

                const tempomatValues = this
                    .calculateTempomatValues(x);

                return tempomatValues?.relativeUserPaceDiff;
            });

        if (allRelativeUserPaces.some(x => x === null))
            return null;

        // calculates the average lag beghind from all started course
        const avgRelativeUserPace = allRelativeUserPaces
            .reduce((a, b) => a + b, 0) / allRelativeUserPaces.length;

        return avgRelativeUserPace;
    }

    /*
    * Calc the average lag beghind from all started course
    */
    getAvgRelativeUserPaceDiffs(tempomatCalculationDatas: TempomatCalculationDataView[]) {

        return tempomatCalculationDatas
            .groupBy(x => x.userId)
            .map(x => {

                const relativeUserPaceDiff = this
                    .getRelativeUserPaceDiffs(x.items);

                const filteredRelativeUserPaceDiffs = relativeUserPaceDiff
                    .filter(x => x)
                    .filter(x => x !== 0);

                return {
                    userId: x.first.userId,
                    relativeUserPaceDiff: getArrayAverage(filteredRelativeUserPaceDiffs)
                };
            });
    }

    /**
     * Calculates multiple relative user pace diffs from
     * tempomat calculation data.
     */
    getRelativeUserPaceDiffs(tempomatCalculationDatas: TempomatCalculationDataView[]) {

        return tempomatCalculationDatas.map(x => {
            const actualUserPace = this
                ._calculateActualUserPace(
                    x.startDate,
                    new Date(Date.now()),
                    x.totalCompletedItemCount
                )

            const estimatedUserPace = this
                ._calculateEstimatedUserPace(
                    x.startDate,
                    x.requiredCompletionDate || x.originalPrevisionedCompletionDate,
                    x.totalItemCount
                )

            const relativeUserPaceDiff = this
                ._calculateRelativeUserPaceDiff(
                    estimatedUserPace,
                    actualUserPace
                );

            return relativeUserPaceDiff;
        })
    }

    /**
     * Calculates tempomat values with userId 
     * @param tempomatCalculationDataViews 
     * @returns 
     */
    calculateCompanyTempomatValues(tempomatCalculationDataViews: TempomatCalculationDataView[]): CalculatedTempomatValueTypeWithUserId[] {
        return tempomatCalculationDataViews
            .map(x => ({
                userId: x.userId,
                ...this.calculateTempomatValues(x)
            }));
    }

    calculateCompanyRelativeUserPaceDiffs(companyTempomatValues: CalculatedTempomatValueTypeWithUserId[]) {
        return companyTempomatValues
            .filter(x => (x !== null && x.relativeUserPaceDiff !== null))
            .map(x => x.relativeUserPaceDiff);
    }

    /**
     * Calc tempomat values for one users one course
     */
    calculateTempomatValues({
        originalPrevisionedCompletionDate,
        totalItemCount,
        totalCompletedItemCount,
        startDate,
        requiredCompletionDate
    }: CalculateTempomatValuesArgs): CalculatedTempomatValueType {

        try {

            const previsionedCompletionDate = this
                .calculateNewPrevisionedDate(
                    startDate,
                    new Date(Date.now()),
                    totalCompletedItemCount,
                    totalItemCount
                );

            const { recommendedItemsPerDay, recommendedItemsPerWeek } = this
                ._calculateRecommendedItemsPerDay(
                    startDate,
                    new Date(Date.now()),
                    requiredCompletionDate || originalPrevisionedCompletionDate,
                    totalItemCount,
                    requiredCompletionDate ? 'increase' : 'normal'
                );

            const actualUserPace = this
                ._calculateActualUserPace(
                    startDate,
                    new Date(Date.now()),
                    totalCompletedItemCount
                )

            const estimatedUserPace = this
                ._calculateEstimatedUserPace(
                    startDate,
                    requiredCompletionDate || originalPrevisionedCompletionDate,
                    totalItemCount
                )

            const relativeUserPaceDiff = this
                ._calculateRelativeUserPaceDiff(
                    estimatedUserPace,
                    actualUserPace
                );

            return instantiate<CalculatedTempomatValueType>({
                previsionedCompletionDate,
                recommendedItemsPerDay,
                recommendedItemsPerWeek,
                originalPrevisionedCompletionDate,
                requiredCompletionDate,
                startDate,
                relativeUserPaceDiff
            });
        }
        catch (e: any) {

            throw new Error(`Tempomat calculation error! Msg: ${e.message}`);
        }
    }


    /**
     * Calculates the real lag behind in days which
     * means that whatever deadline the user exceeds
     * it counts the days from it.
     * 
     * @param currentDate 
     * @param deadlineDate 
     * @returns 
     */
    calculateLagBehindDaysFromDeadline(
        currentDate: Date,
        deadlineDate: Date
    ) {

        /* If the user haven't exceeded the deadline return 0 */
        if (currentDate <= deadlineDate)
            return 0;

        return dateDiffInDays(deadlineDate, currentDate)
    }


    /**
     * Calculates the previsioned difference between
     * deadline and previsionedCompletionDate (that is based on
     * the users real pace)
     * 
     ** '=0' => User will complete the course on deadline
     ** '>0' => User will complete the course after deadline
     ** '<0' => User will complete the course before deadline
     * 
     * @param deadlineDate 
     * @param previsionedCompletionDate 
     * @returns
     */
    calculatePrevisionedLagBehindDays(
        deadlineDate: Date,
        previsionedCompletionDate: Date
    ) {

        return dateDiffInDays(deadlineDate, previsionedCompletionDate)
    }

    /**
     * ---------------------- PRIVATE FUNCTIONS
     */

    /**
     * Calculates the users relative pace.
     * 
     * It's a previsioned relative pace because there is not necessarily a real lag behind
     * and the user is just slower or faster than the original estimated pace. 
     * 
     * No matter if it's an estimation or a deadline.
     * 
     ** '=0' => User is progressing as estimated
     ** '>0' => User is faster than the estimation
     ** '<0' => User is slower than the estimation
     */
    private _calculateRelativeUserPaceDiff(
        originalEstimatedUserPace: number,
        realUserPace: number
    ) {
        return relativeDiffInPercentage(originalEstimatedUserPace, realUserPace)
    }

    private _calculateActualUserPace(
        startDate: Date,
        currentDate: Date,
        completedCourseItemCount: number
    ) {

        const daysSpentFromStartDate = dateDiffInDays(startDate, currentDate)

        const actualUserPace = daysSpentFromStartDate / completedCourseItemCount;

        return actualUserPace;
    }

    /**
     * Calculates the estimated user pace that would be
     * required to match the deadline or original estimation.
     */
    private _calculateEstimatedUserPace(
        startDate: Date,
        deadlineDate: Date,
        totalCourseItemCount: number
    ) {

        const previsionedCourseLength = dateDiffInDays(startDate, deadlineDate)

        const estimatedUserPace = previsionedCourseLength / totalCourseItemCount;

        return estimatedUserPace;
    }

    /**
     * Calculates recommended items per day from either the
     * required or the previsioned completion date
     * because it cannot be determined
     * 
     * In normal mode, calculates from start date, so the
     * recommendation stays the same through the whole completion.
     * 
     * In increase mode, calculates from current date, so the
     * recommendation increases 
     * 
     * @param startDate 
     * @param currentDate 
     * @param deadlineDate 
     * @param totalItemsCount 
     * @param mode 
     * @returns 
     */
    private _calculateRecommendedItemsPerDay(
        startDate: Date,
        currentDate: Date,
        deadlineDate: Date,
        totalItemsCount: number,
        mode: 'normal' | 'increase'
    ) {

        // In normal mode it can't exceed the limits, so returning
        // the originally calculated recommendations.
        if (mode === 'normal') {

            const daysFromStartToDeadline = dateDiffInDays(startDate, deadlineDate);
            const recommendedItemsPerDay = Math.ceil(totalItemsCount / daysFromStartToDeadline);
            const recommendedItemsPerWeek = (() => {

                const recommendedItemsPerWeek = recommendedItemsPerDay * 7;

                if (recommendedItemsPerDay >= totalItemsCount)
                    return totalItemsCount;

                return recommendedItemsPerWeek;

            })();

            return {
                recommendedItemsPerDay,
                recommendedItemsPerWeek
            }

        }

        // Increase mode. Try to recommend as much videos as it can.

        const totalItems20Percent = totalItemsCount / 5

        // Deadline already exceeded so recommending the maximum.
        if (currentDate > deadlineDate) {
            return {
                recommendedItemsPerDay: totalItems20Percent,
                recommendedItemsPerWeek: totalItemsCount
            }
        }

        /**
         * Limiting the recommended videos per day because
         * it makes no sense to recommend e.g. 100 videos
         * 2 days before the deadline.
         */
        const limitRecommendation = (
            recommendedItemsPerDay: number,
            totalItemsCount: number,
            daysUntilDeadline: number
        ) => {

            const totalItems20Percent = totalItemsCount / 5

            // Never recommend more than 20% of the course
            // for one day, even if the deadline is near.
            if (recommendedItemsPerDay > totalItems20Percent)
                return totalItems20Percent;

            // The user will probably fail the deadline at this point so
            // limiting the recommendations, to not recommend
            // the whole course for the last days.
            //
            // TODO: This condition should be further improved for
            // short courses. (Because the whole course could be 5 days long)
            if (daysUntilDeadline < 5)
                return totalItems20Percent;

            return recommendedItemsPerDay;
        }

        const daysUntilDeadline = dateDiffInDays(currentDate, deadlineDate);
        const recommendedItemsPerDay = Math.ceil(totalItemsCount / daysUntilDeadline);
        const limitedRecommendedItemsPerDay = limitRecommendation(recommendedItemsPerDay, totalItemsCount, daysUntilDeadline);
        const limitedRecommendedItemsPerWeek = (() => {

            const recommendedItemsPerWeek = limitedRecommendedItemsPerDay * 7;

            if (recommendedItemsPerDay >= totalItemsCount)
                return totalItemsCount;

            return recommendedItemsPerWeek;
        })();

        return {
            recommendedItemsPerDay: limitedRecommendedItemsPerDay,
            recommendedItemsPerWeek: limitedRecommendedItemsPerWeek
        };

        /* TODO: Implement fallback value when no pretest

        // fallback value if there is no pretest
        return {
            recommendedItemsPerDay: 6,
            recommendedItemsPerWeek: 41
        }; */
    }

    /**
     * Calculates the real previsioned date only from
     * the actual progress that has been made. 
     * 
     * TODO: The previsioned date can be incorrect, because
     *       the completed course item count can contain 
     *       the same video more than one times.
     * 
     * @param startDate 
     * @param currentDate 
     * @param completedCourseItemCount 
     * @param totalCourseItemCount 
     */
    calculateNewPrevisionedDate(
        startDate: Date,
        currentDate: Date,
        completedCourseItemCount: number,
        totalCourseItemCount: number
    ) {

        if (!startDate)
            return null;

        if (!completedCourseItemCount || completedCourseItemCount < 1)
            return null;

        // This is not correct yet
        const courseItemsLeft = totalCourseItemCount - completedCourseItemCount

        const daysSpentFromStartDate = dateDiffInDays(startDate, currentDate);

        // This needs a uniquely completed course item count too
        const avgCourseItemsWatchedPerDay = (() => {

            const watchedItemsAvg = completedCourseItemCount / daysSpentFromStartDate

            if (typeof watchedItemsAvg !== 'number' || watchedItemsAvg < 0.5)
                return 0.5;

            return watchedItemsAvg;
        })();

        const daysLeft = courseItemsLeft * avgCourseItemsWatchedPerDay

        return addDays(currentDate, daysLeft);
    }
} 
