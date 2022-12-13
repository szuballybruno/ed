import { CourseUserPresetType, Id } from '@episto/commontypes';
import { AdminCourseUserStatsDTO, CourseLearningDTO, HomePageStatsDTO, ImproveYourselfPageStatsDTO, UserCourseStatsDTO, UserCourseStatsOverviewDTO, UserExamStatsDTO, UserLearningOverviewDataDTO, UserLearningPageStatsDTO, UserModuleStatsDTO, UserVideoStatsDTO } from '@episto/communication';
import { PrincipalId } from '@episto/x-core';
import { User } from '../models/entity/misc/User';
import { TempomatCalculationDataModel } from '../models/TempomatCalculationDataModel';
import { AdminCourseUserStatsView } from '../models/views/AdminCourseUserStatsView';
import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { HomePageStatsView } from '../models/views/HomePageStatsView';
import { ImproveYourselfPageStatsView } from '../models/views/ImproveYourselfPageStatsView';
import { MostProductiveTimeRangeView } from '../models/views/MostProductiveTimeRangeView';
import { AdminUserCoursesView } from '../models/views/UserCourseStatsView';
import { UserDailyActivityChartView } from '../models/views/UserDailyActivityChartView';
import { UserExamStatsView } from '../models/views/UserExamStatsView';
import { UserLearningOverviewStatsView } from '../models/views/UserLearningOverviewStatsView';
import { UserLearningPageStatsView } from '../models/views/UserLearningPageStatsView';
import { UserModuleStatsView } from '../models/views/UserModuleStatsView';
import { UserSpentTimeRatioView } from '../models/views/UserSpentTimeRatioView';
import { UserVideoStatsView } from '../models/views/UserVideoStatsView';
import { newNotImplemented } from '../utilities/helpers';
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

        const avgRelativeUserPace = await this
            ._tempomatService
            .getUserAvgPerformancePercentageAsync(userId);

        return this._mapperService
            .mapTo(HomePageStatsDTO, [stats, avgRelativeUserPace]);
    }

    async getUserLearningPageStatsAsync(principalId: PrincipalId) {

        const userId = principalId
            .getId();

        const stats = await this._ormService
            .query(UserLearningPageStatsView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        const avgRelativeUserPaceDiff = await this
            ._tempomatService
            .getUserAvgPerformancePercentageAsync(userId);

        return this
            ._mapperService
            .mapTo(UserLearningPageStatsDTO, [stats, avgRelativeUserPaceDiff]);
    }

    async getImproveYourselfPageStatsAsync(principalId: PrincipalId) {

        const userId = principalId.toSQLValue();

        const stats = await this._ormService
            .query(ImproveYourselfPageStatsView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        const mostProductiveTimeRangeView = await this._ormService
            .query(MostProductiveTimeRangeView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        const userDailyActivityChartView = await this._ormService
            .query(UserDailyActivityChartView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        return this._mapperService
            .mapTo(ImproveYourselfPageStatsDTO, [stats, mostProductiveTimeRangeView, userDailyActivityChartView]);
    }

    /**
     * Gets the statistics for the users every course
     * TODO: Filter courses by permissions
     * TODO: Rearrange the view, so when the user hasn't
     *       started a course yet, return all the courses with empty
     *       data, instead of []
     */
    async getUserCourseStatsAsync(
        principalId: PrincipalId,
        userId: Id<'User'>,
        loadAvailable: boolean
    ) {

        const query = this._ormService
            .query(AdminUserCoursesView, { userId })
            .where('userId', '=', 'userId');

        const userCoursesDataViews = await (loadAvailable ? query : query.and('isAssigned', '=', 'true'))
            .getMany();

        const courseIds = userCoursesDataViews
            .map(x => x.courseId);

        const tempomatCalcDataViews = await this
            ._tempomatService
            .getTempomatCalculationDataViewsByCourseIdsAsync(courseIds, userId);

        const tempomatValues = userCoursesDataViews
            .map((userCourseData): TempomatCalculationDataModel => {

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

                const tempomatValues = this
                    ._tempomatService
                    .getTempomatValues({
                        ...tempomatCalcData,
                        currentDate: new Date()
                    });

                const { lagBehindDays, previsionedCompletionDate } = tempomatValues;

                return {
                    ...statView,
                    previsionedDate: previsionedCompletionDate,
                    previsionedLagBehindDays: lagBehindDays,
                    actualLagBehindDays: lagBehindDays
                };
            });

        const filteredStats = (() => {

            if (preset === 'inprogress')
                return mergedStats
                    .filter(x => x.startDate && !x.finalExamScorePercentage);

            if (preset === 'notstartedyet')
                return mergedStats
                    .filter(x => !x.startDate && x.requiredCompletionDate);

            if (preset === 'completed')
                return mergedStats
                    .filter(x => x.finalExamScorePercentage);

            return [];
        })();

        return this._mapperService
            .mapTo(AdminCourseUserStatsDTO, [filteredStats]);
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

        const userSpentTimeRatio = await this._ormService
            .query(UserSpentTimeRatioView, { userId })
            .where('userId', '=', 'userId')
            .getOneOrNull();

        const courses = await this._ormService
            .query(CourseLearningStatsView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        // in progress courses
        const inProgressCourses = courses
            .filter(x => x.isStarted && !x.isCompleted);

        const inProgressCoursesAsCourseShortDTOs = this._mapperService
            .mapTo(CourseLearningDTO, [inProgressCourses]);

        const stats = await this._ormService
            .query(UserLearningOverviewStatsView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        return this
            ._mapperService
            .mapTo(UserLearningOverviewDataDTO, [
                stats,
                inProgressCoursesAsCourseShortDTOs,
                userSpentTimeRatio,
                inProgressCourses,
                userId
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
            .getProgressChartDataAsync(principalId, courseId, userId);

        return this._mapperService
            .mapTo(UserCourseStatsOverviewDTO, [courseStats, userSpentTimeRatio, progressChartData as any]);
    }
}
