import { CourseUserPresetType, Id } from '@episto/commontypes';
import { AdminCourseUserStatsDTO, CourseLearningDTO, HomePageStatsDTO, UserCourseStatsDTO, UserCourseStatsOverviewDTO, UserExamStatsDTO, UserStatisticsDTO, UserLearningPageStatsDTO, UserModuleStatsDTO, UserVideoStatsDTO } from '@episto/communication';
import { PrincipalId } from '@episto/x-core';
import { User } from '../models/entity/misc/User';
import { TempomatDataModel } from '../models/TempomatDataModel';
import { AdminCourseUserStatsView } from '../models/views/AdminCourseUserStatsView';
import { AdminUserCoursesView } from '../models/views/AdminUserCoursesView';
import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { HomePageStatsView } from '../models/views/HomePageStatsView';
import { UserExamStatsView } from '../models/views/UserExamStatsView';
import { UserLearningOverviewStatsView } from '../models/views/UserLearningOverviewStatsView';
import { UserLearningPageStatsView } from '../models/views/UserLearningPageStatsView';
import { UserModuleStatsView } from '../models/views/UserModuleStatsView';
import { UserSpentTimeRatioView } from '../models/views/UserSpentTimeRatioView';
import { UserVideoStatsView } from '../models/views/UserVideoStatsView';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
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
    async getUserCourseStatsAsync(
        principalId: PrincipalId,
        userId: Id<'User'>
    ) {

        const userCoursesDataViews = await this
            ._ormService
            .query(AdminUserCoursesView, { userId })
            .where('userId', '=', 'userId')
            .and('isAssigned', '=', 'true')
            .getMany();

        const courseIds = userCoursesDataViews
            .map(x => x.courseId);

        const tempomatCalcDataViews = await this
            ._tempomatService
            .getTempomatCalculationDataViewsByCourseIdsAsync(courseIds, userId);

        const tempomatValues = userCoursesDataViews
            .map((userCourseData): TempomatDataModel => {

                const tempomatCalculationData = tempomatCalcDataViews
                    .single(x => x.courseId === userCourseData.courseId);

                return this
                    ._tempomatService
                    .getTempomatValues({
                        ...tempomatCalculationData,
                        currentDate: new Date()
                    });
            });

        return this._mapperService
            .mapTo(UserCourseStatsDTO, [userCoursesDataViews, tempomatValues]);
    }

    /**
     * getCourseUserStatsAsync
     */
    async getCourseUserStatsAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        preset: CourseUserPresetType) {

        const { companyId } = await this._ormService
            .query(User, { userId: principalId })
            .where('id', '=', 'userId')
            .getSingle();

        const userStatViews = await this._ormService
            .query(AdminCourseUserStatsView, { courseId, companyId })
            .where('courseId', '=', 'courseId')
            .and('companyId', '=', 'companyId')
            .getMany();

        const userIds = userStatViews
            .map(view => view.userId);

        const tempomatCalculationDataViews = await this
            ._tempomatService
            .getTempomatCalculationDataViewsByUserIdsAsync(userIds, courseId);

        const mergedStats = userStatViews
            .map(statView => {

                const tempomatCalcData = tempomatCalculationDataViews
                    .single(x => x.userId === statView.userId);

                const tempomatData = this
                    ._tempomatService
                    .getTempomatValues({
                        ...tempomatCalcData,
                        currentDate: new Date()
                    });

                return {
                    view: statView,
                    tempomatData
                };
            });

        const statisticsItems = (() => {

            if (preset === 'inprogress')
                return mergedStats
                    .filter(x => x.view.startDate && !x.view.finalExamScorePercentage);

            if (preset === 'notstartedyet')
                return mergedStats
                    .filter(x => !x.view.startDate && x.view.requiredCompletionDate);

            if (preset === 'completed')
                return mergedStats
                    .filter(x => x.view.finalExamScorePercentage);

            return [];
        })();

        return this._mapperService
            .mapTo(AdminCourseUserStatsDTO, [statisticsItems]);
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
            .query(AdminUserCoursesView, { userId, courseId })
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
