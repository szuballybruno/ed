import { UserActiveCourseView } from '../models/views/UserActiveCourseView';
import { UserCourseCompletionCurrentView } from '../models/views/UserCourseCompletionCurrentView';
import { UserCourseProgressView } from '../models/views/UserCourseProgressView';
import { UserCourseRecommendedItemQuotaView } from '../models/views/UserCourseRecommendedItemQuotaView';
import { UserDailyCourseItemProgressView } from '../models/views/UserDailyCourseItemProgressView';
import { UserWeeklyCourseItemProgressView } from '../models/views/UserWeeklyCourseItemProgressView';
import { RecomendedItemQuotaDTO } from '../shared/dtos/RecomendedItemQuotaDTO';
import { UserActiveCourseDTO } from '../shared/dtos/UserActiveCourseDTO';
import { UserCourseProgressChartDTO } from '../shared/dtos/UserCourseProgressChartDTO';
import { MapperService } from './MapperService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class UserProgressService extends ServiceBase {

    constructor(mapperService: MapperService, ormservice: ORMConnectionService) {

        super(mapperService, ormservice);
    }

    async getActiveCoursesAsync(userId: number) {

        const views = await this._ormService
            .getRepository(UserActiveCourseView)
            .createQueryBuilder('uacv')
            .where('uacv.userId = :userId', { userId })
            .getMany();

        return this._mapperService
            .mapMany(UserActiveCourseView, UserActiveCourseDTO, views);
    }

    async getRecommendedItemQuotaAsync(userId: number, courseId: number) {

        const courseProgressView = await this._ormService
            .getRepository(UserCourseRecommendedItemQuotaView)
            .findOne({
                where: {
                    courseId,
                    userId
                }
            });

        const currentDailyCompletedView = await this._ormService
            .getRepository(UserDailyCourseItemProgressView)
            .createQueryBuilder('udcipv')
            .where('udcipv.userId = :userId', { userId })
            .andWhere('udcipv.courseId = :courseId', { courseId })
            .andWhere('udcipv.isCurrent = true', { courseId })
            .getOne();

        const getCurrentWeeklyCompletedView = await this._ormService
            .getRepository(UserWeeklyCourseItemProgressView)
            .createQueryBuilder('udcipv')
            .where('udcipv.userId = :userId', { userId })
            .andWhere('udcipv.courseId = :courseId', { courseId })
            .andWhere('udcipv.isCurrent = true', { courseId })
            .getOne();

        return {
            recommendedItemsPerDay: courseProgressView?.recommendedItemsPerDay ?? 0,
            recommendedItemsPerWeek: courseProgressView?.recommendedItemsPerWeek ?? 0,
            completedThisWeek: getCurrentWeeklyCompletedView?.completedItemCount ?? 0,
            completedToday: currentDailyCompletedView?.completedItemCount ?? 0
        } as RecomendedItemQuotaDTO;
    }

    async getProgressChartDataAsync(userId: number, courseId: number) {

        const estimationView = await this
            ._ormService
            .getRepository(UserCourseCompletionCurrentView)
            .findOneOrFail({
                where: {
                    courseId,
                    userId
                }
            });

        const dailyViews = await this._ormService
            .getRepository(UserDailyCourseItemProgressView)
            .createQueryBuilder('udcipv')
            .where('udcipv.courseId = :courseId', { courseId })
            .andWhere('udcipv.userId = :userId', { userId })
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