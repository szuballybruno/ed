import { instantiate } from '@episto/commonlogic';
import { Id } from '@episto/commontypes';
import { CourseProgressOverviewDTO, UserActiveCourseDTO, UserProgressChartStep } from '@episto/communication';
import { DateHelpers, PrincipalId } from '@episto/x-core';
import { DailyProgressModel } from '../models/misc/DailyProgressModel';
import { UserActiveCourseView } from '../models/views/UserActiveCourseView';
import { UserDailyCourseItemProgressView } from '../models/views/UserDailyCourseItemProgressView';
import { UserWeeklyCourseItemProgressView } from '../models/views/UserWeeklyCourseItemProgressView';
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

    /**
     * Get user course progress dashboard obverview stats 
     */
    async getCourseProgressOverviewAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        const userId = principalId
            .getId();

        const {
            tempomatMode,
            requiredCompletionDate,
            estimatedCompletionDate,
            recommendedItemsPerDay,
            recommendedItemsPerWeek
        } = await this
            ._tempomatService
            .getTempomatValuesAsync(userId, courseId);

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

        return instantiate<CourseProgressOverviewDTO>({
            tempomatMode,
            deadlineDate: requiredCompletionDate,
            estimatedCompletionDate,
            recommendedItemsPerDay,
            recommendedItemsPerWeek,
            completedThisWeek: getCurrentWeeklyCompletedView?.completedItemCount ?? 0,
            completedToday: currentDailyCompletedView?.completedItemCount ?? 0
        });
    }

    /**
     * Get user progress chart data 
     */
    async getProgressChartDataByCourseAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        userId: Id<'User'>
    ) {

        const currentDate = new Date();
        const rangeSize = 60;

        const {
            avgItemCompletionPercentagePerDay,
            recommendedPercentPerDay
        } = await this
            ._tempomatService
            .getTempomatValuesAsync(userId, courseId);

        const dailyProgressViews = await this._ormService
            .query(UserDailyCourseItemProgressView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        const dailyProgressModels = dailyProgressViews
            .map(x => ({
                date: x.completionDate,
                progressPercentage: x.completedPercentage
            } as DailyProgressModel))

        return this
            .getProgressChartData({
                avgItemCompletionPercentagePerDay,
                currentDate,
                dailyProgressModels,
                rangeSize,
                recommendedPercentPerDay
            });
    }

    /**
     * Get user progress chart data 
     */
    async getProgressChartData({
        currentDate,
        rangeSize,
        avgItemCompletionPercentagePerDay,
        recommendedPercentPerDay,
        dailyProgressModels
    }: {
        currentDate: Date,
        rangeSize: number,
        avgItemCompletionPercentagePerDay: number,
        recommendedPercentPerDay: number,
        dailyProgressModels: DailyProgressModel[]
    }) {
        const rangeHalf = rangeSize / 2;
        const rangeStartDate = currentDate.addDays(-1 * rangeHalf);

        let lastStep: UserProgressChartStep = {
            actualCompletedPercentage: 0,
            date: rangeStartDate,
            previsionedCompletedPercentage: 0,
            recommendedCompletedPercentage: 0
        };

        const steps = Array
            .from({ length: rangeSize })
            .map((_, index) => {

                const date = rangeStartDate
                    .addDays(index);

                const pastCurrent = index > rangeHalf;

                const actualProgressView = dailyProgressModels
                    .firstOrNull(progressModel => DateHelpers
                        .compareDatesWithoutTime(progressModel.date, date));

                const actualCompletedPercentage = pastCurrent
                    ? null
                    : (lastStep.actualCompletedPercentage ?? 0) + (actualProgressView?.progressPercentage ?? 0);

                const previsionedCompletedPercentage = actualCompletedPercentage !== null
                    ? actualCompletedPercentage
                    : lastStep.previsionedCompletedPercentage + avgItemCompletionPercentagePerDay;

                const recommendedCompletedPercentage = actualCompletedPercentage !== null
                    ? actualCompletedPercentage
                    : lastStep.recommendedCompletedPercentage + recommendedPercentPerDay;

                const step = instantiate<UserProgressChartStep>({
                    date,
                    actualCompletedPercentage,
                    previsionedCompletedPercentage,
                    recommendedCompletedPercentage
                });

                lastStep = step;

                return step;
            })

        return steps;
    }
}