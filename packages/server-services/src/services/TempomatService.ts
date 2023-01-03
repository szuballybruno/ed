import { instantiate } from '@episto/commonlogic';
import { Id, TempomatModeType, TempoRatingType } from '@episto/commontypes';
import { PrincipalId } from '@thinkhub/x-core';
import { UserCourseBridge } from '../models/tables/UserCourseBridge';
import { TempomatDataAvgModel } from '../models/misc/TempomatDataAvgModel';
import { TempomatDataModel } from '../models/misc/TempomatDataModel';
import { UserPerformancePercentageAverageModel } from '../models/misc/UserPerformancePercentageAverageModel';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { TempomatTargetDateDataView } from '../models/views/TempomatTargetDateDataView';
import { addDays, dateDiffInDays } from '../utilities/helpers';
import { GlobalConfigurationService } from './GlobalConfigurationService';
import { ORMConnectionService } from './ORMConnectionService';

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
     * Returns the original previsioned completion date, 
     * relative to the current date, and the prequiz user answers / default daily minutes
     */
    async getEstimatedCompletionDateAsync(
        userId: Id<'User'>,
        courseId: Id<'Course'>) {

        const data = await this
            ._ormService
            .query(TempomatTargetDateDataView, { userId, courseId })
            .where('courseId', '=', 'courseId')
            .and('userId', '=', 'userId')
            .getSingle();

        const estimatedMinutesPerDay = data.estimatedMinutesPerDay ?? this._config.tempomat.defaultMinutesPerDay;
        const previsionedDurationDays = data.courseDurationMinutes / estimatedMinutesPerDay;
        const previsionedCompletionDate = new Date().addDays(previsionedDurationDays);

        return previsionedCompletionDate;
    }

    // ------------- AVG values 

    /**
     * getTempomatDatasByCompanyIdAsync
     */
    async getAverageTempomatDataByCompanyAsync(companyId: Id<'Company'>): Promise<TempomatDataAvgModel[]> {

        const tempomatCalcDatasAllUsers = await this
            ._ormService
            .query(TempomatCalculationDataView, { companyId })
            .where('companyId', '=', 'companyId')
            .getMany();

        const tempomatValuesAllUsers = this
            .getTempomatValuesBatch(tempomatCalcDatasAllUsers, new Date());

        return tempomatValuesAllUsers
            .groupBy(x => x.userId)
            .map(x => {

                const tempomatValues = x.items;

                const avgTempoPercentage = tempomatValues
                    .average(x => x.recommendedItemsPerDay);

                const avgTempoRating = this
                    ._getTempoRating(avgTempoPercentage);

                return instantiate<TempomatDataAvgModel>({
                    userId: x.key,
                    tempoRating: avgTempoRating,
                    tempoPercentage: avgTempoPercentage
                });
            });
    }

    /**
     * Calculates the average performance 
     * for a user across all courses 
     */
    async getAverageTempomatDataByUserAsync(userId: Id<'User'>) {

        const tempomatCalculationDatas = await this
            ._ormService
            .query(TempomatCalculationDataView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        const tempomatValues = this
            .getTempomatValuesBatch(tempomatCalculationDatas, new Date());

        return this
            ._getAvgTempomatData(tempomatValues);
    }

    /**
     * Get average tempomat data
     */
    private _getAvgTempomatData(tempomatValues: TempomatDataModel[]) {

        const avgTempoPercentage = tempomatValues
            .average(x => x.recommendedItemsPerDay);

        const avgTempoRating = this
            ._getTempoRating(avgTempoPercentage);

        return instantiate<TempomatDataAvgModel>({
            tempoRating: avgTempoRating,
            tempoPercentage: avgTempoPercentage
        });
    }

    // ------------ EXACT TEMPOMAT VALUES

    /**
     * Calc tempomat values for one users one course
     */
    async getTempomatValuesAsync(userId: Id<'User'>, courseId: Id<'Course'>) {

        const tempomatCalculationData = await this._ormService
            .query(TempomatCalculationDataView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        return this
            .getTempomatValues({
                ...tempomatCalculationData,
                currentDate: new Date()
            });
    }

    /**
     * Get tempomat values for a specific user
     */
    getTempomatValuesBatch(views: TempomatCalculationDataView[], currentDate: Date): TempomatDataModel[] {

        try {

            return views
                .map(view => this
                    .getTempomatValues({
                        ...view,
                        currentDate
                    }));
        }
        catch (e: any) {

            throw new Error(`Get tempomat values batch failed. ${e.message}`);
        }
    }

    /**
     * Get tempomat values for a specific user
     */
    getTempomatValues({
        originalEstimatedCompletionDate,
        totalItemCount,
        startDate,
        requiredCompletionDate,
        currentDate,
        tempomatMode,
        totalCompletedItemCount,
        userId
    }: {
        tempomatMode: TempomatModeType,
        originalEstimatedCompletionDate: Date | null,
        requiredCompletionDate: Date | null,
        startDate: Date | null,
        totalItemCount: number,
        totalCompletedItemCount: number,
        currentDate: Date,
        userId: Id<'User'>
    }): TempomatDataModel {

        try {

            if (!originalEstimatedCompletionDate)
                throw new Error(`Original previsionedCompletionDate is null or undefined!`);

            if (!startDate) {

                const tempDate = new Date()
                    .addDays(45);

                return instantiate<TempomatDataModel>({
                    estimatedCompletionDate: tempDate,
                    recommendedItemsPerDay: 0,
                    recommendedItemsPerWeek: 0,
                    originalEstimatedCompletionDate: tempDate,
                    requiredCompletionDate: tempDate,
                    userPerformancePercentage: 0,
                    lagBehindDays: 0,
                    userId,
                    avgItemCompletionPerDay: 0,
                    avgItemCompletionPercentagePerDay: 0,
                    recommendedPercentPerDay: 0,
                    isStartedCourse: false,
                    tempomatMode,
                    tempoRating: 'average'
                });
            }

            const completedCourseItemCount = totalCompletedItemCount;
            const remainingItemsCount = totalItemCount - completedCourseItemCount;
            const targetCompletionDate = requiredCompletionDate || originalEstimatedCompletionDate;

            const avgItemCompletionPerDay = this
                ._getAverageCompletedItemsCountPerDay({
                    completedCourseItemCount,
                    currentDate,
                    startDate
                });

            const estimatedCompletionDate = this
                ._getEstimatedCompletionDate({
                    avgItemCompletionPerDay,
                    currentDate,
                    completedCourseItemCount,
                    totalCourseItemCount: totalItemCount,
                    originalEstimatedCompletionDate
                });

            const recommendedItemsPerDay = this
                ._getRecommendedItemsPerDay({
                    startDate,
                    currentDate,
                    targetCompletionDate,
                    remainingItemsCount,
                    avgItemCompletionPerDay,
                    ignoreTargetDate: tempomatMode === 'light'
                });

            const recommendedItemsPerWeek = this
                ._getRecommendedItemsPerWeek({
                    recommendedItemsPerDay,
                    remainingItemsCount
                });

            const userPerformancePercentage = this
                ._getUserPerformancePercentage({
                    actualItemsPerDay: avgItemCompletionPerDay,
                    targetItemsPerDay: recommendedItemsPerDay
                });

            const lagBehindDays = 0;

            const avgItemCompletionPercentagePerDay = avgItemCompletionPerDay / totalItemCount * 100;
            const recommendedPercentPerDay = recommendedItemsPerDay / totalItemCount * 100;

            return instantiate<TempomatDataModel>({
                estimatedCompletionDate: estimatedCompletionDate,
                recommendedItemsPerDay,
                recommendedItemsPerWeek,
                originalEstimatedCompletionDate: originalEstimatedCompletionDate,
                requiredCompletionDate,
                userPerformancePercentage,
                lagBehindDays,
                userId,
                avgItemCompletionPerDay,
                avgItemCompletionPercentagePerDay,
                recommendedPercentPerDay,
                isStartedCourse: true,
                tempomatMode,
                tempoRating: this
                    ._getTempoRating(userPerformancePercentage)
            });
        }
        catch (e: any) {

            throw new Error(`Tempomat calculation error! Msg: ${e.message}`);
        }
    }

    // -------------- GET CALC DATA VIEWS 

    /**
     * getTempomatClculationDataViewsAsync
     */
    async getTempomatCalculationDataViewsByCourseIdsAsync(courseIds: Id<'Course'>[], userId: Id<'User'>) {

        const tempomatCalculationData = await this._ormService
            .query(TempomatCalculationDataView, { userId, courseIds })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseIds')
            .getMany();

        return tempomatCalculationData;
    }

    /**
     * getTempomatClculationDataViewsAsync
     */
    async getTempomatCalculationDataViewsByUserIdsAsync(userIds: Id<'User'>[], courseId: Id<'Course'>) {

        const tempomatCalculationData = await this._ormService
            .query(TempomatCalculationDataView, { userIds, courseId })
            .where('userId', '=', 'userIds')
            .and('courseId', '=', 'courseId')
            .getMany();

        return tempomatCalculationData;
    }

    // ---------------------- PRIVATE FUNCTIONS

    /**
     * Get recommended items per day,
     * if target date is ignored, 
     * returns the average item completion count per day
     */
    private _getRecommendedItemsPerDay({
        currentDate,
        targetCompletionDate,
        startDate,
        remainingItemsCount,
        avgItemCompletionPerDay,
        ignoreTargetDate
    }: {
        startDate: Date,
        currentDate: Date,
        targetCompletionDate: Date,
        remainingItemsCount: number,
        avgItemCompletionPerDay: number,
        ignoreTargetDate: boolean
    }) {

        // if ignored target date, return avg
        if (ignoreTargetDate)
            return avgItemCompletionPerDay;

        const maxRecommendedItemsPerDay = 20;
        const isDeadlineExceeded = currentDate > targetCompletionDate;
        const remainingDays = dateDiffInDays(startDate, targetCompletionDate);

        const maxRecommendedItemsAfterDeadline = Math
            .min(remainingItemsCount, maxRecommendedItemsPerDay);

        const recommendedItemsPerDay = (isDeadlineExceeded || remainingDays === 0)
            ? maxRecommendedItemsAfterDeadline
            : remainingItemsCount / remainingDays;

        return recommendedItemsPerDay;
    }

    /**
     * Get recommended items per week
     */
    private _getRecommendedItemsPerWeek({
        remainingItemsCount,
        recommendedItemsPerDay
    }: {
        remainingItemsCount: number,
        recommendedItemsPerDay: number
    }) {

        return Math
            .min(recommendedItemsPerDay * 7, remainingItemsCount);
    }

    /**
     * Get estimated completion date  
     */
    private _getEstimatedCompletionDate({
        avgItemCompletionPerDay,
        completedCourseItemCount,
        currentDate,
        originalEstimatedCompletionDate,
        totalCourseItemCount
    }: {
        avgItemCompletionPerDay: number,
        currentDate: Date,
        completedCourseItemCount: number,
        totalCourseItemCount: number,
        originalEstimatedCompletionDate: Date,
    }) {

        // default value until user has some progress
        if (avgItemCompletionPerDay === 0)
            return originalEstimatedCompletionDate;

        const courseItemsLeft = totalCourseItemCount - completedCourseItemCount;
        const daysLeft = courseItemsLeft / avgItemCompletionPerDay;
        return addDays(currentDate, daysLeft);
    }

    /**
     * Get average item count completed per day (date period start <-> now)
     */
    private _getAverageCompletedItemsCountPerDay({
        completedCourseItemCount,
        currentDate,
        startDate,
    }: {
        startDate: Date,
        currentDate: Date,
        completedCourseItemCount: number,
    }) {

        const daysSpentFromStartDate = dateDiffInDays(startDate, currentDate);
        const avgItemCompletionPerDay = daysSpentFromStartDate === 0
            ? 0
            : completedCourseItemCount / daysSpentFromStartDate;

        return avgItemCompletionPerDay;
    }

    /**
     * Get user pace diff percentage 
     */
    private _getUserPerformancePercentage({
        actualItemsPerDay,
        targetItemsPerDay
    }: {
        actualItemsPerDay: number,
        targetItemsPerDay: number
    }) {

        if (targetItemsPerDay === 0)
            return 100;

        return actualItemsPerDay / targetItemsPerDay * 100;
    }

    /**
     * Get performance rating
     */
    private _getTempoRating(tempoPercentage: number): TempoRatingType {

        if (tempoPercentage < 0)
            throw new Error(`Performance percentage is not allowed to be smaller than zero!`);

        if (tempoPercentage > 130)
            return 'very_good';

        if (tempoPercentage > 110)
            return 'good';

        if (tempoPercentage > 95)
            return 'average';

        if (tempoPercentage > 70)
            return 'bad';

        return 'very_bad';
    }
} 
