import { instantiate } from '@episto/commonlogic';
import { Id, TempomatModeType } from '@episto/commontypes';
import { PrincipalId } from '@thinkhub/x-core';
import { UserCourseBridge } from '../models/tables/UserCourseBridge';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { addDays, dateDiffInDays, getArrayAverage, relativeDiffInPercentage } from '../utilities/helpers';
import { GlobalConfigurationService } from './GlobalConfigurationService';
import { ORMConnectionService } from './ORMConnectionService';

type CalculateTempomatValuesArgs = {
    tempomatMode: string,
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

    constructor(
        private _config: GlobalConfigurationService,
        private _ormService: ORMConnectionService) {
    }

    // ---------------- MISC

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
            .getOneOrNull();

        if (!tempomatCalculationData)
            return null

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

            if (x.totalItemCount <= x.totalCompletedItemCount)
                return 0;                    

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
        deadlineDate: Date | null,
        previsionedCompletionDate: Date
    ) {

        if (!deadlineDate)
            return 0;

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

        const actualUserPace =  completedCourseItemCount / daysSpentFromStartDate;

        return actualUserPace;
    }

    /**
     * Calculates the estimated user pace that would be
     * required to match the deadline or original estimation.
     */
    private _calculateEstimatedUserPace(
        startDate: Date,
        deadlineDate: Date | null,
        totalCourseItemCount: number
    ) {
        
        if (!deadlineDate)
            return 6

        const previsionedCourseLength = dateDiffInDays(startDate, deadlineDate)

        const estimatedUserPace = totalCourseItemCount / previsionedCourseLength;

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
        deadlineDate: Date | null,
        totalItemsCount: number,
        mode: 'normal' | 'increase'
    ) {

        if (!deadlineDate)
            return {
                recommendedItemsPerDay: 6,
                recommendedItemsPerWeek: 41
            };

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














































    /* 
    
    
    
    
    
    
    
    
    
    
    
    
//         /**
//          * Returns the original previsioned completion date, 
//          * relative to the current date, and the prequiz user answers / default daily minutes
//          */
//     async getEstimatedCompletionDateAsync(
//         userId: Id<'User'>,
//         courseId: Id<'Course'>) {

//         const data = await this
//             ._ormService
//             .query(TempomatTargetDateDataView, { userId, courseId })
//             .where('courseId', '=', 'courseId')
//             .and('userId', '=', 'userId')
//             .getSingle();

//         const estimatedMinutesPerDay = data.estimatedMinutesPerDay ?? this._config.tempomat.defaultMinutesPerDay;
//         const previsionedDurationDays = data.courseDurationMinutes / estimatedMinutesPerDay;
//         const previsionedCompletionDate = new Date().addDays(previsionedDurationDays);

//         return previsionedCompletionDate;
//     }

//     // ------------- AVG values 

//     /**
//      * getTempomatDatasByCompanyIdAsync
//      */
//     async getAverageTempomatDataByCompanyAsync(companyId: Id<'Company'>): Promise<TempomatDataAvgModel[]> {

//         const tempomatCalcDatasAllUsers = await this
//             ._ormService
//             .query(TempomatCalculationDataView, { companyId })
//             .where('companyId', '=', 'companyId')
//             .getMany();

//         const tempomatValuesAllUsers = this
//             .getTempomatValuesBatch(tempomatCalcDatasAllUsers, new Date());

//         return tempomatValuesAllUsers
//             .groupBy(x => x.userId)
//             .map(x => {

//                 const tempomatValues = x.items;

//                 const avgTempoPercentage = tempomatValues
//                     .average(x => x.recommendedItemsPerDay);

//                 const avgTempoRating = this
//                     ._getTempoRating(avgTempoPercentage);

//                 return instantiate<TempomatDataAvgModel>({
//                     userId: x.key,
//                     tempoRating: avgTempoRating,
//                     tempoPercentage: avgTempoPercentage
//                 });
//             });
//     }

//     /**
//      * Calculates the average performance 
//      * for a user across all courses 
//      */
//     async getAverageTempomatDataByUserAsync(userId: Id<'User'>) {

//         const tempomatCalculationDatas = await this
//             ._ormService
//             .query(TempomatCalculationDataView, { userId })
//             .where('userId', '=', 'userId')
//             .getMany();

//         const tempomatValues = this
//             .getTempomatValuesBatch(tempomatCalculationDatas, new Date());

//         return this
//             ._getAvgTempomatData(tempomatValues);
//     }

//     /**
//      * Get average tempomat data
//      */
//     private _getAvgTempomatData(tempomatValues: TempomatDataModel[]) {

//         const avgTempoPercentage = tempomatValues
//             .average(x => x.recommendedItemsPerDay);

//         const avgTempoRating = this
//             ._getTempoRating(avgTempoPercentage);

//         return instantiate<TempomatDataAvgModel>({
//             tempoRating: avgTempoRating,
//             tempoPercentage: avgTempoPercentage
//         });
//     }

//     // ------------ EXACT TEMPOMAT VALUES

//     /**
//      * Calc tempomat values for one users one course
//      */
//     async getTempomatValuesAsync(userId: Id<'User'>, courseId: Id<'Course'>) {

//         const tempomatCalculationData = await this._ormService
//             .query(TempomatCalculationDataView, { userId, courseId })
//             .where('userId', '=', 'userId')
//             .and('courseId', '=', 'courseId')
//             .getSingle();

//         return this
//             .getTempomatValues({
//                 ...tempomatCalculationData,
//                 currentDate: new Date()
//             });
//     }

//     /**
//      * Get tempomat values for a specific user
//      */
//     getTempomatValuesBatch(views: TempomatCalculationDataView[], currentDate: Date): TempomatDataModel[] {

//         try {

//             return views
//                 .map(view => this
//                     .getTempomatValues({
//                         ...view,
//                         currentDate
//                     }));
//         }
//         catch (e: any) {

//             throw new Error(`Get tempomat values batch failed. ${e.message}`);
//         }
//     }

//     /**
//      * Get tempomat values for a specific user
//      */
//     getTempomatValues({
//         originalEstimatedCompletionDate,
//         totalItemCount,
//         startDate,
//         requiredCompletionDate,
//         currentDate,
//         tempomatMode,
//         totalCompletedItemCount,
//         userId,
//         courseId
//     }: { currentDate: Date } & TempomatCalculationDataView): TempomatDataModel {

//         try {

//             if (!originalEstimatedCompletionDate)
//                 throw new Error(`Original previsionedCompletionDate is null or undefined!`);

//             if (!startDate) {

//                 const tempDate = new Date()
//                     .addDays(45);

//                 return instantiate<TempomatDataModel>({
//                     estimatedCompletionDate: tempDate,
//                     recommendedItemsPerDay: 0,
//                     recommendedItemsPerWeek: 0,
//                     originalEstimatedCompletionDate: tempDate,
//                     requiredCompletionDate: tempDate,
//                     userPerformancePercentage: 0,
//                     lagBehindDays: 0,
//                     userId,
//                     avgItemCompletionPerDay: 0,
//                     avgItemCompletionPercentagePerDay: 0,
//                     recommendedPercentPerDay: 0,
//                     isStartedCourse: false,
//                     tempomatMode,
//                     tempoRating: 'average',
//                     courseId
//                 });
//             }

//             const completedCourseItemCount = totalCompletedItemCount;
//             const remainingItemsCount = totalItemCount - completedCourseItemCount;
//             const targetCompletionDate = requiredCompletionDate || originalEstimatedCompletionDate;

//             const avgItemCompletionPerDay = this
//                 ._getAverageCompletedItemsCountPerDay({
//                     completedCourseItemCount,
//                     currentDate,
//                     startDate
//                 });

//             const estimatedCompletionDate = this
//                 ._getEstimatedCompletionDate({
//                     avgItemCompletionPerDay,
//                     currentDate,
//                     completedCourseItemCount,
//                     totalCourseItemCount: totalItemCount,
//                     originalEstimatedCompletionDate
//                 });

//             const recommendedItemsPerDay = this
//                 ._getRecommendedItemsPerDay({
//                     startDate,
//                     currentDate,
//                     targetCompletionDate,
//                     remainingItemsCount,
//                     avgItemCompletionPerDay,
//                     ignoreTargetDate: tempomatMode === 'light'
//                 });

//             const recommendedItemsPerWeek = this
//                 ._getRecommendedItemsPerWeek({
//                     recommendedItemsPerDay,
//                     remainingItemsCount
//                 });

//             const userPerformancePercentage = this
//                 ._getUserPerformancePercentage({
//                     actualItemsPerDay: avgItemCompletionPerDay,
//                     targetItemsPerDay: recommendedItemsPerDay
//                 });

//             const lagBehindDays = 0;

//             const avgItemCompletionPercentagePerDay = avgItemCompletionPerDay / totalItemCount * 100;
//             const recommendedPercentPerDay = recommendedItemsPerDay / totalItemCount * 100;

//             return instantiate<TempomatDataModel>({
//                 estimatedCompletionDate: estimatedCompletionDate,
//                 recommendedItemsPerDay,
//                 recommendedItemsPerWeek,
//                 originalEstimatedCompletionDate: originalEstimatedCompletionDate,
//                 requiredCompletionDate,
//                 userPerformancePercentage,
//                 lagBehindDays,
//                 userId,
//                 avgItemCompletionPerDay,
//                 avgItemCompletionPercentagePerDay,
//                 recommendedPercentPerDay,
//                 isStartedCourse: true,
//                 tempomatMode,
//                 courseId,
//                 tempoRating: this
//                     ._getTempoRating(userPerformancePercentage)
//             });
//         }
//         catch (e: any) {

//             throw new Error(`Tempomat calculation error! Msg: ${e.message}`);
//         }
//     }

//     // -------------- GET CALC DATA VIEWS 

//     /**
//      * getTempomatClculationDataViewsAsync
//      */
//     async getTempomatCalculationDataViewsByCourseIdsAsync(courseIds: Id<'Course'>[], userId: Id<'User'>) {

//         const tempomatCalculationData = await this._ormService
//             .query(TempomatCalculationDataView, { userId, courseIds })
//             .where('userId', '=', 'userId')
//             .and('courseId', '=', 'courseIds')
//             .getMany();

//         return tempomatCalculationData;
//     }

//     /**
//      * getTempomatClculationDataViewsAsync
//      */
//     async getTempomatCalculationDataViewsByUserIdsAsync(userIds: Id<'User'>[], courseId: Id<'Course'>) {

//         const tempomatCalculationData = await this._ormService
//             .query(TempomatCalculationDataView, { userIds, courseId })
//             .where('userId', '=', 'userIds')
//             .and('courseId', '=', 'courseId')
//             .getMany();

//         return tempomatCalculationData;
//     }

//     // ---------------------- PRIVATE FUNCTIONS

//     /**
//      * Get recommended items per day,
//      * if target date is ignored, 
//      * returns the average item completion count per day
//      */
//     private _getRecommendedItemsPerDay({
//         currentDate,
//         targetCompletionDate,
//         startDate,
//         remainingItemsCount,
//         avgItemCompletionPerDay,
//         ignoreTargetDate
//     }: {
//         startDate: Date,
//         currentDate: Date,
//         targetCompletionDate: Date,
//         remainingItemsCount: number,
//         avgItemCompletionPerDay: number,
//         ignoreTargetDate: boolean
//     }) {

//         // if ignored target date, return avg
//         if (ignoreTargetDate)
//             return avgItemCompletionPerDay;

//         const maxRecommendedItemsPerDay = 20;
//         const isDeadlineExceeded = currentDate > targetCompletionDate;
//         const remainingDays = dateDiffInDays(startDate, targetCompletionDate);

//         const maxRecommendedItemsAfterDeadline = Math
//             .min(remainingItemsCount, maxRecommendedItemsPerDay);

//         const recommendedItemsPerDay = (isDeadlineExceeded || remainingDays === 0)
//             ? maxRecommendedItemsAfterDeadline
//             : remainingItemsCount / remainingDays;

//         return recommendedItemsPerDay;
//     }

//     /**
//      * Get recommended items per week
//      */
//     private _getRecommendedItemsPerWeek({
//         remainingItemsCount,
//         recommendedItemsPerDay
//     }: {
//         remainingItemsCount: number,
//         recommendedItemsPerDay: number
//     }) {

//         return Math
//             .min(recommendedItemsPerDay * 7, remainingItemsCount);
//     }

//     /**
//      * Get estimated completion date  
//      */
//     private _getEstimatedCompletionDate({
//         avgItemCompletionPerDay,
//         completedCourseItemCount,
//         currentDate,
//         originalEstimatedCompletionDate,
//         totalCourseItemCount
//     }: {
//         avgItemCompletionPerDay: number,
//         currentDate: Date,
//         completedCourseItemCount: number,
//         totalCourseItemCount: number,
//         originalEstimatedCompletionDate: Date,
//     }) {

//         // default value until user has some progress
//         if (avgItemCompletionPerDay === 0)
//             return originalEstimatedCompletionDate;

//         const courseItemsLeft = totalCourseItemCount - completedCourseItemCount;
//         const daysLeft = courseItemsLeft / avgItemCompletionPerDay;
//         return addDays(currentDate, daysLeft);
//     }

//     /**
//      * Get average item count completed per day (date period start <-> now)
//      */
//     private _getAverageCompletedItemsCountPerDay({
//         completedCourseItemCount,
//         currentDate,
//         startDate,
//     }: {
//         startDate: Date,
//         currentDate: Date,
//         completedCourseItemCount: number,
//     }) {

//         const daysSpentFromStartDate = dateDiffInDays(startDate, currentDate);
//         const avgItemCompletionPerDay = daysSpentFromStartDate === 0
//             ? 0
//             : completedCourseItemCount / daysSpentFromStartDate;

//         return avgItemCompletionPerDay;
//     }

//     /**
//      * Get user pace diff percentage 
//      */
//     private _getUserPerformancePercentage({
//         actualItemsPerDay,
//         targetItemsPerDay
//     }: {
//         actualItemsPerDay: number,
//         targetItemsPerDay: number
//     }) {

//         if (targetItemsPerDay === 0)
//             return 100;

//         return actualItemsPerDay / targetItemsPerDay * 100;
//     }



//     /**
//      * Get performance rating
//      */
//     private _getTempoRating(tempoPercentage: number): TempoRatingType {

//         if (tempoPercentage < 0)
//             throw new Error(`Performance percentage is not allowed to be smaller than zero!`);

//         if (tempoPercentage > 130)
//             return 'very_good';

//         if (tempoPercentage > 110)
//             return 'good';

//         if (tempoPercentage > 95)
//             return 'average';

//         if (tempoPercentage > 70)
//             return 'bad';

//         return 'very_bad';
//     }
// } 