import { CourseData } from '../models/entity/course/CourseData';
import { UserActiveCourseView } from '../models/views/UserActiveCourseView';
import { UserCourseCompletionCurrentView } from '../models/views/UserCourseCompletionCurrentView';
import { UserCourseProgressView } from '../models/views/UserCourseProgressView';
import { UserCourseRecommendedItemQuotaView } from '../models/views/UserCourseRecommendedItemQuotaView';
import { UserDailyCourseItemProgressView } from '../models/views/UserDailyCourseItemProgressView';
import { UserWeeklyCourseItemProgressView } from '../models/views/UserWeeklyCourseItemProgressView';
import { RecomendedItemQuotaDTO } from '../shared/dtos/RecomendedItemQuotaDTO';
import { UserActiveCourseDTO } from '../shared/dtos/UserActiveCourseDTO';
import { UserCourseProgressChartDTO } from '../shared/dtos/UserCourseProgressChartDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { MapperService } from './MapperService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class UserProgressService extends ServiceBase {

    constructor(mapperService: MapperService, ormservice: ORMConnectionService) {

        super(mapperService, ormservice);
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

        const courseProgressView = await this._ormService
            .query(UserCourseRecommendedItemQuotaView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        const currentDailyCompletedView = await this._ormService
            .query(UserDailyCourseItemProgressView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .and('isCurrent', 'IS', 'true')
            .getSingle();

        const getCurrentWeeklyCompletedView = await this._ormService
            .query(UserWeeklyCourseItemProgressView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .and('isCurrent', 'IS', 'true')
            .getSingle();

        return {
            recommendedItemsPerDay: courseProgressView?.recommendedItemsPerDay ?? 0,
            recommendedItemsPerWeek: courseProgressView?.recommendedItemsPerWeek ?? 0,
            completedThisWeek: getCurrentWeeklyCompletedView?.completedItemCount ?? 0,
            completedToday: currentDailyCompletedView?.completedItemCount ?? 0
        } as RecomendedItemQuotaDTO;
    }

    async getProgressChartDataAsync(principalId: PrincipalId, courseId: number) {

        const userId = principalId.toSQLValue();

        const estimationView = await this
            ._ormService
            .query(UserCourseCompletionCurrentView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        const dailyViews = await this._ormService
            .query(UserDailyCourseItemProgressView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        const dto = {
            estimatedCompletionDate: estimationView.previsionedCompletionDate,
            estimatedLengthInDays: estimationView.previsionedLengthDays,
            startDate: estimationView.startDate,
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