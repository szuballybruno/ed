import { UserActiveCourseView } from '../models/views/UserActiveCourseView';
import { UserDailyCourseItemProgressView } from '../models/views/UserDailyCourseItemProgressView';
import { UserWeeklyCourseItemProgressView } from '../models/views/UserWeeklyCourseItemProgressView';
import { RecommendedItemQuotaDTO } from '@episto/communication';
import { UserActiveCourseDTO } from '@episto/communication';
import { UserCourseProgressChartDTO } from '@episto/communication';
import { instantiate } from '@episto/commonlogic';
import { EpistoLineChartDataType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { dateDiffInDays, forN } from '../utilities/helpers';
import { PrincipalId } from '@episto/x-core';
import { AuthorizationService } from './AuthorizationService';
import { MapperService } from './MapperService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TempomatService } from './TempomatService';

export class UserProgressService extends ServiceBase {

    private _tempomatService: TempomatService;
    private _authorizationService: AuthorizationService;

    constructor(
        mapperService: MapperService,
        ormservice: ORMConnectionService,
        tempomatService: TempomatService,
        authorizationService: AuthorizationService
    ) {

        super(mapperService, ormservice);

        this._tempomatService = tempomatService;
        this._authorizationService = authorizationService;
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

        const userId = principalId.getId();

        const tempomatData = await this
            ._tempomatService
            .calculateTempomatValuesAsync(userId, courseId);

        const tempomatMode = await this
            ._tempomatService
            .getTempomatModeAsync(principalId, courseId)

        const requiredCompletionDate = tempomatData?.requiredCompletionDate || null;
        const previsionedCompletionDate = tempomatData?.previsionedCompletionDate || null;

        const recommendedItemsPerDay = (() => {

            if (!tempomatData.recommendedItemsPerDay)
                return null;

            // If tempomat mode is light, not recommend anything
            if (tempomatMode === 'light')
                return null;

            return tempomatData.recommendedItemsPerDay
        })();

        const recommendedItemsPerWeek = (() => {
            if (!tempomatData.recommendedItemsPerWeek)
                return null;

            // If tempomat mode is light, not recommend anything
            if (tempomatMode === 'light')
                return null;

            return tempomatData.recommendedItemsPerWeek
        })();

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

        return instantiate<RecommendedItemQuotaDTO>({
            isDeadlineSet: !!requiredCompletionDate,
            tempomatMode: tempomatMode,
            previsionedCompletionDate: previsionedCompletionDate,
            recommendedItemsPerDay: recommendedItemsPerDay,
            recommendedItemsPerWeek: recommendedItemsPerWeek,
            completedThisWeek: getCurrentWeeklyCompletedView?.completedItemCount ?? 0,
            completedToday: currentDailyCompletedView?.completedItemCount ?? 0
        });
    }

    async getProgressChartDataAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        userId?: Id<'User'>
    ) {

        const userIdOrPrincipalId = userId
            ? userId
            : principalId.getId();

        const dailyViews = await this._ormService
            .query(UserDailyCourseItemProgressView, { userIdOrPrincipalId, courseId })
            .where('userId', '=', 'userIdOrPrincipalId')
            .and('courseId', '=', 'courseId')
            .getMany();

        const { startDate, previsionedCompletionDate } = await this
            ._tempomatService
            .calculateTempomatValuesAsync(userIdOrPrincipalId, courseId);

        const estimatedLengthInDays = (previsionedCompletionDate && startDate)
            ? dateDiffInDays(startDate, previsionedCompletionDate)
            : null;

        const calculateDatesFromCurrentDate = (currentDate: Date, estimatedLengthInDays: number) => {

            return forN(estimatedLengthInDays, index => {

                const date = currentDate
                    .addDays(index);

                return date.toLocaleDateString(undefined, {
                    month: '2-digit',
                    day: '2-digit'
                });
            });

        };

        const estimatedDates = calculateDatesFromCurrentDate(new Date(Date.now()), estimatedLengthInDays!);/* 
        const originalEstimatedDates = calculateDatesFromStart(startDate!, originalEstimatedLengthInDays!); */

        const daysFromStart = startDate
            ? dateDiffInDays(new Date(startDate), new Date(Date.now()))
            : null;



        const calculateEpistoLineChartData = (dates: string[]): EpistoLineChartDataType => {
            return dates
                .map((_, index) => (100 / dates.length) * (index + 1)) as EpistoLineChartDataType;
        };

        const previsionedProgress = calculateEpistoLineChartData(estimatedDates);/* 
        const originalPrevisionedProgress = calculateEpistoLineChartData(originalEstimatedDates); */

        let latestCompletionDatePercentage = 0;



        /* const originalEstimatedLengthInDays = (originalPrevisionedCompletionDate && startDate)
        ? dateDiffInDays(startDate, originalPrevisionedCompletionDate)
        : null; */

        //const interval = Math.floor(estimatedDates.length / 7);

        console.log(previsionedProgress);

        const calculateActualProgressChart = () => {

            const datesUntilToday = daysFromStart
                ? forN(daysFromStart, index => index)
                : null;

            return datesUntilToday
                ? datesUntilToday.map((_, index) => {

                    const up = dailyViews.find(x => x.offsetDaysFromStart === index + 1)?.completedPercentage || 0;

                    if (latestCompletionDatePercentage <= up) {

                        latestCompletionDatePercentage += up;
                        return up;
                    } else {
                        return latestCompletionDatePercentage;
                    }
                })
                : [];
        }

        const actualProgress = calculateActualProgressChart()

        return instantiate<UserCourseProgressChartDTO>({
            dates: estimatedDates,
            previsionedProgress: previsionedProgress,
            actualProgress: actualProgress
        });
    }
}