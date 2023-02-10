import { Id } from '@episto/commontypes';
import { AdminCourseUserStatsDTO, AdminUserCourseDTO, HomePageStatsDTO, UserCourseStatsOverviewDTO, UserExamStatsDTO, UserLearningPageStatsDTO, UserModuleStatsDTO, UserStatisticsDTO, UserVideoStatsDTO } from '@episto/communication';
import { PrincipalId } from '@thinkhub/x-core';
import { TempomatDataModel } from '../models/misc/TempomatDataModel';
import { User } from '../models/tables/User';
import { AdminCourseUserStatsView } from '../models/views/AdminCourseUserStatsView';
import { AdminUserCourseView } from '../models/views/AdminUserCourseView';
import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { HomePageStatsView } from '../models/views/HomePageStatsView';
import { UserExamStatsView } from '../models/views/UserExamStatsView';
import { UserLearningOverviewStatsView } from '../models/views/UserLearningOverviewStatsView';
import { UserLearningPageStatsView } from '../models/views/UserLearningPageStatsView';
import { UserModuleStatsView } from '../models/views/UserModuleStatsView';
import { UserSpentTimeRatioView } from '../models/views/UserSpentTimeRatioView';
import { UserVideoStatsView } from '../models/views/UserVideoStatsView';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService';
import { TempomatService } from './TempomatService';
import { UserProgressService } from './UserProgressService';

export class UserStatsService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _tempomatService: TempomatService;
    private _userProgressService: UserProgressService;

    constructor(
        ormService: ORMConnectionService,
        mapperSvc: MapperService,
        tempomatService: TempomatService,
        userProgressService: UserProgressService) {

        this._ormService = ormService;
        this._mapperService = mapperSvc;
        this._tempomatService = tempomatService;
        this._userProgressService = userProgressService;
    }

    async getHomePageStatsAsync(principalId: PrincipalId) {

        const userId = principalId
            .getId();

        const stats = await this._ormService
            .query(HomePageStatsView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        const { tempoPercentage } = await this
            ._tempomatService
            .getAverageTempomatDataByUserAsync(userId);

        return this._mapperService
            .mapTo(HomePageStatsDTO, [stats, tempoPercentage]);
    }

    async getUserLearningPageStatsAsync(principalId: PrincipalId) {

        const userId = principalId
            .getId();

        const stats = await this._ormService
            .query(UserLearningPageStatsView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        const { tempoPercentage, tempoRating } = await this
            ._tempomatService
            .getAverageTempomatDataByUserAsync(userId);

        return this
            ._mapperService
            .mapTo(UserLearningPageStatsDTO, [stats, tempoPercentage, tempoRating]);
    }

    /**
     * Gets the statistics for the users every course
     */
    async getAdminUserCoursesAsync(
        principalId: PrincipalId,
        userId: Id<'User'>,
        loadAvailable: boolean
    ) {

        const views = await this
            ._ormService
            .query(AdminUserCourseView, { userId, isAssigned: !loadAvailable })
            .where('userId', '=', 'userId')
            .and('isAssigned', '=', 'isAssigned')
            .getMany();

        const courseIds = views
            .map(x => x.courseId);

        const tempomatCalcDataViews = await this
            ._tempomatService
            .getTempomatCalculationDataViewsByCourseIdsAsync(courseIds, userId);

        const tempomatValues = tempomatCalcDataViews
            .map((tempomatCalculationData): TempomatDataModel => {

                return this
                    ._tempomatService
                    .getTempomatValues({
                        ...tempomatCalculationData,
                        currentDate: new Date()
                    });
            });

        return this._mapperService
            .mapTo(AdminUserCourseDTO, [views, tempomatValues]);
    }

    /**
     * getCourseUserStatsAsync
     */
    async getCourseUserStatsAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>) {

        const { companyId } = await this._ormService
            .query(User, { userId: principalId })
            .where('id', '=', 'userId')
            .getSingle();

        const views = await this._ormService
            .query(AdminCourseUserStatsView, { courseId, companyId })
            .where('courseId', '=', 'courseId')
            .and('companyId', '=', 'companyId')
            .getMany();

        const userIds = views
            .map(view => view.userId);

        const tempomatCalculationDataViews = await this
            ._tempomatService
            .getTempomatCalculationDataViewsByUserIdsAsync(userIds, courseId);

        const tempomatDatas = tempomatCalculationDataViews
            .map(tempomatCalcData => this
                ._tempomatService
                .getTempomatValues({
                    ...tempomatCalcData,
                    currentDate: new Date()
                }));

        return this
            ._mapperService
            .mapTo(AdminCourseUserStatsDTO, [views, tempomatDatas]);
    }

    /**
     * Gets the statistics for the users every watched video
     */
    async getUserVideoStatsAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        userId: Id<'User'> | null
    ) {

        const stats = await this._ormService
            .query(UserVideoStatsView, {
                userId: userId
                    ? userId
                    : principalId,
                courseId
            })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        return this._mapperService
            .mapTo(UserVideoStatsDTO, [stats]);
    }

    /**
     * Gets the statistics for the users every completed exam
     */

    async getUserExamStatsAsync(principalId: PrincipalId, courseId: Id<'Course'>, userId: Id<'User'> | null) {

        const stats = await this._ormService
            .query(UserExamStatsView, { userId: userId ? userId : principalId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        return this._mapperService
            .mapTo(UserExamStatsDTO, [stats]);
    }

    /**
     * Gets the statistics for the users every watched video
     */
    async getUserModuleStatsAsync(principalId: PrincipalId, courseId: Id<'Course'>, userId: Id<'User'> | null) {

        const stats = await this._ormService
            .query(UserModuleStatsView, { userId: userId ? userId : principalId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        return this._mapperService
            .mapTo(UserModuleStatsDTO, [stats]);
    }

    /**
     * Gets the learning overview statistics data for single user
     * TODO: Correct mapping
     */
    async getUserLearningOverviewDataAsync(principalId: PrincipalId, userId: Id<'User'>) {

        const userSpentTimeRatio = (await this._ormService
            .query(UserSpentTimeRatioView, { userId })
            .where('userId', '=', 'userId')
            .getOneOrNull()) ?? {
            totalExamSessionElapsedTime: 0,
            totalQuestionElapsedTime: 0,
            totalVideoWatchElapsedTime: 0,
            otherTotalSpentSeconds: 0,
            userId
        };

        const courses = await this._ormService
            .query(CourseLearningStatsView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        const hasInProgressCourse = courses
            .some(x => x.isStarted && !x.isCompleted);

        const stats = await this._ormService
            .query(UserLearningOverviewStatsView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        const { tempoRating, tempoPercentage } = await this
            ._tempomatService
            .getAverageTempomatDataByUserAsync(userId);

        return this
            ._mapperService
            .mapTo(UserStatisticsDTO, [
                userId,
                stats,
                userSpentTimeRatio,
                hasInProgressCourse,
                tempoRating,
                tempoPercentage,
            ]);
    }

    async getUserCourseStatsOverviewData(
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        userId: Id<'User'>
    ) {
        const courseStats = await this._ormService
            .query(AdminUserCourseView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        const userSpentTimeRatio = await this._ormService
            .query(UserSpentTimeRatioView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        const progressChartData = await this._userProgressService
            .getProgressChartDataByCourseAsync(principalId, courseId, userId);

        const { userPerformancePercentage, tempoRating } = await this
            ._tempomatService
            .getTempomatValuesAsync(userId, courseId);

        return this._mapperService
            .mapTo(UserCourseStatsOverviewDTO, [courseStats, userSpentTimeRatio, progressChartData, userPerformancePercentage, tempoRating]);
    }
}
