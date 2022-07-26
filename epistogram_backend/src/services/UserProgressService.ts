import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { UserActiveCourseView } from '../models/views/UserActiveCourseView';
import { UserDailyCourseItemProgressView } from '../models/views/UserDailyCourseItemProgressView';
import { UserWeeklyCourseItemProgressView } from '../models/views/UserWeeklyCourseItemProgressView';
import { RecomendedItemQuotaDTO } from '../shared/dtos/RecomendedItemQuotaDTO';
import { UserActiveCourseDTO } from '../shared/dtos/UserActiveCourseDTO';
import { UserCourseProgressChartDTO } from '../shared/dtos/UserCourseProgressChartDTO';
import { instantiate } from '../shared/logic/sharedLogic';
import { EpistoLineChartDataType } from '../shared/types/epistoChartTypes';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { dateDiffInDays, forN } from '../utilities/helpers';
import { MapperService } from './MapperService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TempomatService } from './TempomatService';

export class UserProgressService extends ServiceBase {

    private _tempomatService: TempomatService;

    constructor(
        mapperService: MapperService,
        ormservice: ORMConnectionService,
        tempomatService: TempomatService
    ) {

        super(mapperService, ormservice);

        this._tempomatService = tempomatService;
    }

    async getActiveCoursesAsync(principalId: PrincipalId) {

        const userId = principalId.toSQLValue();

        const views = await this._ormService
            .query(UserActiveCourseView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        return this._mapperService
            .mapTo(UserActiveCourseDTO, [views]);
    }

    async getRecommendedItemQuotaAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        const userId = principalId.toSQLValue();

        const tempomatCalculationData = await this._ormService
            .query(TempomatCalculationDataView, {
                userId,
                courseId
            })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        const previsionedCompletionDate = this._tempomatService
            .calculatePrevisionedDate(
                tempomatCalculationData.originalPrevisionedCompletionDate,
                tempomatCalculationData.totalItemCount,
                tempomatCalculationData.totalCompletedItemCount,
                tempomatCalculationData.startDate,
                tempomatCalculationData.tempomatMode,
                tempomatCalculationData.tempomatAdjustmentValue
            );

        const recommendedItemsPerDay = this._tempomatService
            .calculateRecommendedItemsPerDay(
                tempomatCalculationData.startDate,
                previsionedCompletionDate,
                tempomatCalculationData.requiredCompletionDate,
                tempomatCalculationData.totalItemCount
            );

        const currentDailyCompletedView = await this._ormService
            .query(UserDailyCourseItemProgressView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .and('isCurrent', 'IS', 'true')
            .getOneOrNull();

        const getCurrentWeeklyCompletedView = await this._ormService
            .query(UserWeeklyCourseItemProgressView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .and('isCurrent', 'IS', 'true')
            .getOneOrNull();

        return {
            isDeadlineSet: !!tempomatCalculationData.requiredCompletionDate,
            previsionedCompletionDate: previsionedCompletionDate ?? 0,
            recommendedItemsPerDay: recommendedItemsPerDay ?? 0,
            recommendedItemsPerWeek: recommendedItemsPerDay ? recommendedItemsPerDay * 7 : 0,
            completedThisWeek: getCurrentWeeklyCompletedView?.completedItemCount ?? 0,
            completedToday: currentDailyCompletedView?.completedItemCount ?? 0
        } as RecomendedItemQuotaDTO;
    }

    async getProgressChartDataAsync(principalId: PrincipalId, courseId: Id<'Course'>): Promise<UserCourseProgressChartDTO | 'NO DATA'> {

        const userId = principalId.toSQLValue();

        const tempomatCalculationData = await this._ormService
            .query(TempomatCalculationDataView, { courseId, userId })
            .where('courseId', '=', 'courseId')
            .and('userId', '=', 'userId')
            .getSingle();

        /**
         * check preqiz completion
         * if it's incomplete, do not go any further
         */
        const isCompletedPrequiz = !!tempomatCalculationData.originalPrevisionedCompletionDate;
        if (!isCompletedPrequiz)
            return 'NO DATA';

        const previsionedCompletionDate = this._tempomatService
            .calculatePrevisionedDate(
                tempomatCalculationData.originalPrevisionedCompletionDate,
                tempomatCalculationData.totalItemCount,
                tempomatCalculationData.totalCompletedItemCount,
                tempomatCalculationData.startDate,
                tempomatCalculationData.tempomatMode,
                tempomatCalculationData.tempomatAdjustmentValue
            );

        const estimatedLengthInDays = previsionedCompletionDate
            ? dateDiffInDays(tempomatCalculationData.startDate, previsionedCompletionDate)
            : null;

        const originalEstimatedLengthInDays = previsionedCompletionDate
            ? dateDiffInDays(tempomatCalculationData.startDate, tempomatCalculationData.originalPrevisionedCompletionDate)
            : null;

        const dailyViews = await this._ormService
            .query(UserDailyCourseItemProgressView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        const estimatedLengthInDaysOrNull = estimatedLengthInDays
            ? estimatedLengthInDays + 1
            : null;

        const originalEstimatedLengthInDaysOrNull = originalEstimatedLengthInDays
            ? originalEstimatedLengthInDays + 1
            : null;

        if (!estimatedLengthInDaysOrNull)
            throw new Error('Couldn\'t estimate course length');

        if (!originalEstimatedLengthInDaysOrNull)
            throw new Error('Couldn\'t estimate course length');

        const estimatedDates = forN(estimatedLengthInDaysOrNull, index => {

            const date = new Date(tempomatCalculationData.startDate)
                .addDays(index);

            return date.toLocaleDateString(undefined, {
                month: '2-digit',
                day: '2-digit'
            });
        });

        const originalEstimatedDates = forN(originalEstimatedLengthInDaysOrNull, index => {

            const date = new Date(tempomatCalculationData.startDate)
                .addDays(index);

            return date.toLocaleDateString(undefined, {
                month: '2-digit',
                day: '2-digit'
            });
        });

        const datesUntilToday = forN(dateDiffInDays(new Date(tempomatCalculationData.startDate), new Date(Date.now())), index => index);

        const previsionedProgress = estimatedDates
            .map((_, index) => (100 / estimatedDates.length) * (index + 1)) as EpistoLineChartDataType;

        const originalPrevisionedProgress = originalEstimatedDates
            .map((_, index) => (100 / originalEstimatedDates.length) * (index + 1)) as EpistoLineChartDataType;

        let latestCompletionDatePercentage = 0;

        const actualProgress = datesUntilToday.map((_, index) => {

            const up = dailyViews.find(x => x.offsetDaysFromStart === index + 1)?.completedPercentage || 0;

            if (latestCompletionDatePercentage <= up) {

                latestCompletionDatePercentage += up;
                return up;
            } else {
                return latestCompletionDatePercentage;
            }
        });

        const interval = Math.floor(estimatedDates.length / 7);

        return instantiate<UserCourseProgressChartDTO>({
            dates: estimatedDates,
            originalPrevisionedProgress: originalPrevisionedProgress,
            previsionedProgress: previsionedProgress,
            actualProgress: actualProgress
        });
    }
}