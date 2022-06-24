import { CourseData } from '../models/entity/course/CourseData';
import { Course } from '../models/entity/Course';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { UserActiveCourseView } from '../models/views/UserActiveCourseView';
import { UserCourseCompletionCurrentView } from '../models/views/UserCourseCompletionCurrentView';
import { UserDailyCourseItemProgressView } from '../models/views/UserDailyCourseItemProgressView';
import { UserWeeklyCourseItemProgressView } from '../models/views/UserWeeklyCourseItemProgressView';
import { RecomendedItemQuotaDTO } from '../shared/dtos/RecomendedItemQuotaDTO';
import { UserActiveCourseDTO } from '../shared/dtos/UserActiveCourseDTO';
import { UserCourseProgressChartDTO } from '../shared/dtos/UserCourseProgressChartDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { dateDiffInDays } from '../utilities/helpers';
import { MapperService } from './MapperService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TempomatService } from './TempomatService';

export class UserProgressService extends ServiceBase {

    private _tempomatService: TempomatService

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
            .mapMany(UserActiveCourseView, UserActiveCourseDTO, views);
    }

    async getRecommendedItemQuotaAsync(principalId: PrincipalId, courseId: number) {

        const userId = principalId.toSQLValue();

        const tempomatCalculationData = await this._ormService
            .getRepository(TempomatCalculationDataView)
            .findOneOrFail({
                where: {
                    courseId,
                    userId
                }
            });

        const previsionedCompletionDate = this._tempomatService
            .calculatePrevisionedDate(
                tempomatCalculationData.originalPrevisionedCompletionDate,
                tempomatCalculationData.totalItemCount,
                tempomatCalculationData.totalCompletedItemCount,
                tempomatCalculationData.startDate,
                tempomatCalculationData.tempomatMode,
                tempomatCalculationData.tempomatAdjustmentValue
            )

        const recommendedItemsPerDay = this._tempomatService
            .calculateRecommendedItemsPerDay(
                tempomatCalculationData.startDate,
                previsionedCompletionDate,
                tempomatCalculationData.requiredCompletionDate,
                tempomatCalculationData.totalItemCount
            )

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
            recommendedItemsPerDay: recommendedItemsPerDay ?? 0,
            recommendedItemsPerWeek: recommendedItemsPerDay ? recommendedItemsPerDay * 7 : 0,
            completedThisWeek: getCurrentWeeklyCompletedView?.completedItemCount ?? 0,
            completedToday: currentDailyCompletedView?.completedItemCount ?? 0
        } as RecomendedItemQuotaDTO;
    }

    async getProgressChartDataAsync(principalId: PrincipalId, courseId: number) {

        const userId = principalId.toSQLValue();

        const tempomatCalculationData = await this._ormService
            .getRepository(TempomatCalculationDataView)
            .findOneOrFail({
                where: {
                    courseId,
                    userId
                }
            });

        const previsionedCompletionDate = this._tempomatService
            .calculatePrevisionedDate(
                tempomatCalculationData.originalPrevisionedCompletionDate,
                tempomatCalculationData.totalItemCount,
                tempomatCalculationData.totalCompletedItemCount,
                tempomatCalculationData.startDate,
                tempomatCalculationData.tempomatMode,
                tempomatCalculationData.tempomatAdjustmentValue
            )

        const dailyViews = await this._ormService
            .query(UserDailyCourseItemProgressView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        const dto = {
            estimatedCompletionDate: previsionedCompletionDate,
            estimatedLengthInDays: previsionedCompletionDate ? dateDiffInDays(tempomatCalculationData.startDate, previsionedCompletionDate) : null,
            startDate: tempomatCalculationData.startDate,
            days: dailyViews
                .map((x, index) => {

                    const prevView = dailyViews[index - 1];
                    const completedPercentageSum = prevView
                        ? prevView.completedPercentage + x.completedPercentage
                        : x.completedPercentage;

                    return {
                        completedItemCount: x.completedItemCount,
                        completedPercentage: x.completedPercentage,
                        completionDate: x.completionDate,
                        offsetDaysFromStart: x.offsetDaysFromStart,
                        completedPercentageSum
                    };
                })
        } as UserCourseProgressChartDTO;

        return dto;
    }
}