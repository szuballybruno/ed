import { User } from '../models/entity/misc/User';
import { AdminCourseUserStatsView } from '../models/views/AdminCourseUserStatsView';
import { AdminHomePageOverviewView } from '../models/views/AdminHomePageOverviewView';
import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { HomePageStatsView } from '../models/views/HomePageStatsView';
import { ImproveYourselfPageStatsView } from '../models/views/ImproveYourselfPageStatsView';
import { MostProductiveTimeRangeView } from '../models/views/MostProductiveTimeRangeView';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { AdminUserCoursesView } from '../models/views/UserCourseStatsView';
import { UserDailyActivityChartView } from '../models/views/UserDailyActivityChartView';
import { UserExamStatsView } from '../models/views/UserExamStatsView';
import { UserLearningOverviewStatsView } from '../models/views/UserLearningOverviewStatsView';
import { UserLearningPageStatsView } from '../models/views/UserLearningPageStatsView';
import { UserModuleStatsView } from '../models/views/UserModuleStatsView';
import { UserPerformanceComparisonStatsView } from '../models/views/UserPerformanceComparisonStatsView';
import { UserPerformanceView } from '../models/views/UserPerformanceView';
import { UserSpentTimeRatioView } from '../models/views/UserSpentTimeRatioView';
import { UserVideoStatsView } from '../models/views/UserVideoStatsView';
import { AdminCourseUserStatsDTO } from '../shared/dtos/admin/AdminCourseUserStatsDTO';
import { AdminHomePageOverviewDTO } from '../shared/dtos/admin/AdminHomePageOverviewDTO';
import { CourseLearningDTO } from '../shared/dtos/CourseLearningDTO';
import { HomePageStatsDTO } from '../shared/dtos/HomePageStatsDTO';
import { ImproveYourselfPageStatsDTO } from '../shared/dtos/ImproveYourselfPageStatsDTO';
import { UserCourseStatsDTO } from '../shared/dtos/UserCourseStatsDTO';
import { UserCourseStatsOverviewDTO } from '../shared/dtos/UserCourseStatsOverviewDTO';
import { UserExamStatsDTO } from '../shared/dtos/UserExamStatsDTO';
import { UserLearningOverviewDataDTO } from '../shared/dtos/UserLearningOverviewDataDTO';
import { UserLearningPageStatsDTO } from '../shared/dtos/UserLearningPageStatsDTO';
import { UserModuleStatsDTO } from '../shared/dtos/UserModuleStatsDTO';
import { UserVideoStatsDTO } from '../shared/dtos/UserVideoStatsDTO';
import { instantiate } from '../shared/logic/sharedLogic';
import { CourseUserPresetType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { adjustByPercentage, dateDiffInDays, getArrayAverage, mergeArraysByKey } from '../utilities/helpers';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { CalculatedTempomatValueType, CalculatedTempomatValueTypeWithUserId, TempomatService } from './TempomatService';
import { UserProgressService } from './UserProgressService';

interface UserFlagCalculationType extends UserPerformanceComparisonStatsView {
    userProductivity: number,
    companyAvgPerformancePercentage: number,
    companyAvgProductivityPercentage: number
}

interface CompanyUserPerformance extends UserPerformanceView {
    companyId: Id<'Company'>
}

interface CompanyTempomatCalculationData extends TempomatCalculationDataView {
    companyId: Id<'Company'>
}

type UserFlagType = 'low' | 'avg' | 'high'

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

        const avgLagBehindPercentage = await this
            ._tempomatService
            .getAvgLagBehindPercentageAsync(userId);

        return this._mapperService
            .mapTo(HomePageStatsDTO, [stats, avgLagBehindPercentage]);
    }

    async getUserLearningPageStatsAsync(principalId: PrincipalId) {

        const userId = principalId
            .getId();

        const stats = await this._ormService
            .query(UserLearningPageStatsView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        const avgLagBehindPercentage = await this
            ._tempomatService
            .getAvgLagBehindPercentageAsync(userId);

        return this
            ._mapperService
            .mapTo(UserLearningPageStatsDTO, [stats, avgLagBehindPercentage]);
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
    async getUserCourseStatsAsync(principalId: PrincipalId, userId: Id<'User'>, loadAvailable: boolean) {

        const query = this._ormService
            .query(AdminUserCoursesView, { userId })
            .where('userId', '=', 'userId');

        const views = await (loadAvailable ? query : query.and('isAssigned', '=', 'true'))
            .getMany();

        const tempomatValues = views
            .map((userCourseData): CalculatedTempomatValueType => {

                if (!userCourseData.isTempomatReady)
                    return {} as any;

                return this
                    ._tempomatService
                    .calculateTempomatValues(userCourseData);
            });

        return this._mapperService
            .mapTo(UserCourseStatsDTO, [views, tempomatValues]);
    }

    async getCourseUserStatsAsync(principalId: PrincipalId, courseId: Id<'Course'>, preset: CourseUserPresetType) {

        const principalUser = await this._ormService
            .query(User, { userId: principalId })
            .where('id', '=', 'userId')
            .getSingle();

        console.log(principalUser);

        const principalCompanyId = principalUser.companyId;

        const stats = await this._ormService
            .query(AdminCourseUserStatsView, { courseId, companyId: principalCompanyId })
            .where('courseId', '=', 'courseId')
            .and('companyId', '=', 'companyId')
            .getMany();

        console.log(stats);

        /* TODO: This lag behind days doesn't contain 
           adjustment correction like it should */
        const userLagBehinds = stats
            .map(x => {

                if (!x.originalPrevisionedCompletionDate || !x.startDate)
                    return {
                        userId: x.userId,
                        courseId: x.courseId,
                        lagBehindDays: null
                    };

                return {
                    userId: x.userId,
                    courseId: x.courseId,
                    lagBehindDays: this._tempomatService
                        .calculateLagBehindDaysWithPretest(
                            x.originalPrevisionedCompletionDate,
                            x.totalItemCount,
                            x.totalCompletedItemCount,
                            x.startDate
                        )
                };
            });

        const userEstimatedCompletionDates = stats
            .map(x => {

                if (!x.originalPrevisionedCompletionDate || !x.startDate)
                    return {
                        userId: x.userId,
                        courseId: x.courseId,
                        previsionedDate: null
                    };

                return {
                    userId: x.userId,
                    courseId: x.courseId,
                    previsionedDate: this._tempomatService
                        .calculatePrevisionedDate(
                            x.originalPrevisionedCompletionDate,
                            x.totalItemCount,
                            x.totalCompletedItemCount,
                            x.startDate,
                            x.tempomatMode,
                            x.tempomatAdjustmentValue
                        )
                };
            });

        const mergedStats = (() => {

            console.log('mergedStats');

            return stats.map(x => {

                const previsionedDate = userEstimatedCompletionDates
                    .find(pd => pd.userId === x.userId && pd.courseId === x.courseId)
                    ?.previsionedDate || null;

                const lagBehindDays = userLagBehinds
                    .find(lbd => lbd.userId === x.userId && lbd.courseId === x.courseId)
                    ?.lagBehindDays || null;

                return {
                    ...x,
                    previsionedDate: previsionedDate,
                    lagBehindDays: lagBehindDays
                };
            });
        })();

        const inProgressUsers = mergedStats
            .filter(x => x.startDate && !x.finalExamScorePercentage);

        const notStartedUsers = mergedStats
            .filter(x => !x.startDate && x.requiredCompletionDate);

        const completedUsers = mergedStats
            .filter(x => x.finalExamScorePercentage);

        const filteredStats = (() => {

            console.log('filteredStats');

            if (preset === 'inprogress')
                return inProgressUsers;

            if (preset === 'notstartedyet')
                return notStartedUsers;

            if (preset === 'completed')
                return completedUsers;

            return [];
        })();

        return this._mapperService
            .mapTo(AdminCourseUserStatsDTO, [filteredStats]);
    }

    /**
     * Gets the statistics for the users every watched video
     */
    async getUserVideoStatsAsync(principalId: PrincipalId, courseId: Id<'Course'>, userId: Id<'User'> | null) {

        const stats = await this._ormService
            .query(UserVideoStatsView, { userId: userId ? userId : principalId, courseId })
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

        const productivityPercentage = await this
            .calculateUserProductivityAsync(userId);

        return {
            overallPerformancePercentage: stats.overallPerformancePercentage,

            performancePercentage: stats.performancePercentage,
            userReactionTimeDifferencePercentage: stats.userReactionTimeDifferencePercentage,
            reactionTimeScorePoints: stats.totalUserReactionTimePoints,
            productivityPercentage: productivityPercentage,

            isAnyCoursesInProgress: inProgressCourses.any(x => true),
            inProgressCourses: inProgressCoursesAsCourseShortDTOs,

            userActivityDistributionData: {
                watchingVideosPercentage: userSpentTimeRatio?.totalVideoWatchElapsedTime,
                completingExamsPercentage: userSpentTimeRatio?.totalExamSessionElapsedTime,
                answeringQuestionsPercentage: userSpentTimeRatio?.totalQuestionElapsedTime,
                noActivityPercentage: userSpentTimeRatio?.otherTotalSpentSeconds
            },

            userId: userId,
            engagementPoints: stats.engagementPoints,
            totalTimeActiveOnPlatformSeconds: stats.totalTimeActiveOnPlatformSeconds,
            watchedVideos: stats.watchedVideos,
            answeredVideoAndPractiseQuizQuestions: stats.answeredVideoAndPractiseQuizQuestions,
            correctAnsweredVideoAndPractiseQuizQuestions: stats.correctAnsweredVideoAndPractiseQuizQuestions,
            correctAnswerRatePercentage: stats.correctAnswerRatePercentage,
            averageWatchedVideosPerDay: stats.averageWatchedVideosPerDay,
            mostFrequentTimeRange: stats.mostFrequentTimeRange,
            averageSessionLengthSeconds: stats.averageSessionLengthSeconds,
            totalDoneExams: stats.totalDoneExams,
            videosToBeRepeatedCount: stats.videosToBeRepeatedCount
        } as Partial<UserLearningOverviewDataDTO>;
    }

    async getUserCourseStatsOverviewData(
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        userId: Id<'User'>
    ) {

        const currentUserId = userId
            ? userId
            : principalId.getId();

        const courseStats = await this._ormService
            .query(AdminUserCoursesView, { userId: currentUserId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        const userSpentTimeRatio = await this._ormService
            .query(UserSpentTimeRatioView, { userId: currentUserId })
            .where('userId', '=', 'userId')
            .getSingle();

        const progressChartData = await this._userProgressService
            .getProgressChartDataAsync(principalId, courseId, currentUserId);

        return this._mapperService
            .mapTo(UserCourseStatsOverviewDTO, [courseStats, userSpentTimeRatio, progressChartData as any]);
    }

    async getAdminHomeOverviewStatsAsync(principalId: PrincipalId) {

        const user = await this._ormService
            .query(User, { userId: principalId })
            .where('id', '=', 'userId')
            .getSingle();

        const companyId = user.companyId;

        const allFlaggedUsers = await this
            .flagUsersAsync(companyId);

        if (!allFlaggedUsers)
            return;

        const flaggedUsers = allFlaggedUsers
            .filter(x => x?.flag === 'low')
            .length;

        const avgUsers = allFlaggedUsers
            .filter(x => x?.flag === 'avg')
            .length;

        const outstandingUsers = allFlaggedUsers
            .filter(x => x?.flag === 'high')
            .length;

        const companyCourseStats = await this._ormService
            .query(AdminHomePageOverviewView, { companyId })
            .where('companyId', '=', 'companyId')
            .getMany();

        console.log(companyCourseStats);

        return this._mapperService
            .mapTo(AdminHomePageOverviewDTO, [companyCourseStats, flaggedUsers, avgUsers, outstandingUsers]);
    }

    async flagUsersAsync(companyId: Id<'Company'> | null) {

        const isCompanyFiltered = companyId
            ? '='
            : '!=';

        const userPerformanceViews = await this._ormService
            .withResType<CompanyUserPerformance>()
            .query(UserPerformanceView, { companyId })
            .selectFrom(x => x
                .columns(UserPerformanceView, '*')
                .columns(User, {
                    companyId: 'companyId'
                }))
            .innerJoin(User, x => x
                .on('companyId', isCompanyFiltered, 'companyId')
                .and('id', '=', 'userId', UserPerformanceView))
            .getMany();

        const tempomatCalculationViews = await this._ormService
            .withResType<CompanyTempomatCalculationData>()
            .query(TempomatCalculationDataView, { companyId })
            .selectFrom(x => x
                .columns(TempomatCalculationDataView, '*')
                .columns(User, {
                    companyId: 'companyId'
                }))
            .innerJoin(User, x => x
                .on('companyId', isCompanyFiltered, 'companyId')
                .and('id', '=', 'userId', TempomatCalculationDataView))
            .where('startDate', 'IS NOT', 'NULL')
            .and('originalPrevisionedCompletionDate', 'IS NOT', 'NULL')
            .getMany();

        const performanceComparisonStatsViews = await this._ormService
            .query(UserPerformanceComparisonStatsView, { companyId })
            .where('companyId', isCompanyFiltered, 'companyId')
            .getMany();

        if (!userPerformanceViews) {
            return;
        }

        const companyAvgPerformancePercentages = this
            ._calculateCompanyAvgPerformance(userPerformanceViews);

        const companyTempomatValues = this._tempomatService
            .calculateCompanyTempomatValues(tempomatCalculationViews);

        const companyAvgLagBehindPercentages = this
            ._calculateCompanyAvgLagBehindPercentages(tempomatCalculationViews);

        const companyAvgProductivity = this
            ._calculateCompanyProductivity(companyAvgPerformancePercentages, companyAvgLagBehindPercentages);

        const userFlagCalculationData = this
            ._createUserFlagCalculationData(
                performanceComparisonStatsViews,
                companyTempomatValues,
                companyAvgPerformancePercentages,
                companyAvgProductivity);

        return this
            ._flagUsers(userFlagCalculationData);
    }

    calculateUserProductivityAsync = async (userId: Id<'User'>) => {

        const userPerformanceView = await this._ormService
            .query(UserPerformanceView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        const userPerformanceViewFiltered = userPerformanceView
            .filter(x => {
                if (x.performancePercentage === 0)
                    return false;

                if (x.performancePercentage === null)
                    return false;

                return true;
            });

        const avgPerformancePercentage = userPerformanceViewFiltered
            .reduce((total, next) => total + next.performancePercentage, 0) / userPerformanceViewFiltered.length;

        const avgLagBehindPercentage = await this
            ._tempomatService
            .getAvgLagBehindPercentageAsync(userId) || 0;

        return this
            .calculateProductivity(avgPerformancePercentage, avgLagBehindPercentage);
    };

    /**
     * Returns users with different flags based on
     * performance or productivity
     * @param calculationData 
     * @param companyAvgPerformancePercentage 
     * @param companyAvgProductivityPercentage 
     * @returns 
     */
    private _flagUsers(
        calculationData: (UserFlagCalculationType | null)[]
    ): ({ userId: Id<'User'>, flag: UserFlagType } | null)[] {

        return calculationData
            .map(x => {

                if (!x)
                    return null;

                // number of days from signup
                const daysFromSignup = dateDiffInDays(x.creationDate, new Date(Date.now()));

                // defining company avg performance min and max values
                const companyPerformanceAverageMinValue = adjustByPercentage(x.companyAvgPerformancePercentage, -15);
                const companyPerformanceAverageMaxValue = adjustByPercentage(x.companyAvgPerformancePercentage, 5);

                // defining company avg productivity min and max values
                const companyProductivityAverageMinValue = adjustByPercentage(x.companyAvgProductivityPercentage, -15);
                const companyProductivityAverageMaxValue = adjustByPercentage(x.companyAvgProductivityPercentage, 5);

                // compare user performance to company making 3 groups
                const isUserPerformanceLow = x.userPerformanceAverage < companyPerformanceAverageMinValue;
                const isUserPerformanceAvg = x.userPerformanceAverage > companyPerformanceAverageMinValue && x.userPerformanceAverage < companyPerformanceAverageMaxValue;
                const isUserPerformanceHigh = x.userPerformanceAverage > companyPerformanceAverageMaxValue;

                // compare user productivity to company making 3 groups
                const isUserProductivityLow = x.userProductivity < companyProductivityAverageMinValue;
                const isUserProductivityAvg = x.userProductivity > companyProductivityAverageMinValue && x.userProductivity < companyProductivityAverageMaxValue;
                const isUserProductivityHigh = x.userProductivity > companyProductivityAverageMaxValue;

                // extra conditions
                const isUserHaveMinimumPerformance = x.userPerformanceAverage < 50;
                const isAtLeastTenVideosWatched = x.watchedVideosCount > 10;
                const isUserHaveLowEngagement = x.engagementPoints < 30;
                const isUserRequiredToOrStartedCourse = x.isAnyCourseRequiredOrStarted;

                // From days 7 to 21, flagging by performance
                if (daysFromSignup > 7 && daysFromSignup <= 21) {

                    //  Return low performance users
                    if (isUserPerformanceLow || (isUserHaveMinimumPerformance && isAtLeastTenVideosWatched)) {

                        return {
                            userId: x.userId,
                            flag: 'low'
                        };
                    }

                    // Return avg performance users
                    if (isUserPerformanceAvg) {

                        return {
                            userId: x.userId,
                            flag: 'avg'
                        };
                    }

                    // Return high performance users
                    if (isUserPerformanceHigh) {

                        return {
                            userId: x.userId,
                            flag: 'high'
                        };
                    }
                }

                // From days 21, flagging by productivity
                if (daysFromSignup > 21) {

                    //  Return low productivity OR low engagement AND inactive users 
                    if (isUserProductivityLow || (isUserHaveLowEngagement && isUserRequiredToOrStartedCourse)) {

                        return {
                            userId: x.userId,
                            flag: 'low'
                        };
                    }

                    // Return avg productivity users
                    if (isUserProductivityAvg) {

                        return {
                            userId: x.userId,
                            flag: 'avg'
                        };
                    }

                    // Return high productivity users
                    if (isUserProductivityHigh) {

                        return {
                            userId: x.userId,
                            flag: 'high'
                        };
                    }

                }

                return null;
            });

    }

    /**
     * Extends UserPerformanceComparisonStatsView with productivity,
     * startDate and requiredCompletionDate
     */
    private _createUserFlagCalculationData(
        statsViews: UserPerformanceComparisonStatsView[],
        companyTempomatValues: CalculatedTempomatValueTypeWithUserId[],
        companyAvgPerformancePercentages: {
            companyId: Id<'Company'>,
            avgPerformancePercentage: number
        }[],
        companyAvgProductivity: {
            companyId: Id<'Company'>,
            avgProductivityPercentage: number
        }[]
    ) {

        return statsViews
            .map(x => {

                const userTempomatValuesFiltered = companyTempomatValues
                    .filter(ctv => ctv.userId === x.userId);

                if (!userTempomatValuesFiltered)
                    return null;

                if (userTempomatValuesFiltered.length === 0)
                    return null;

                const userTempomatValuesFirst = userTempomatValuesFiltered
                    .first();

                const userProductivity = this
                    .calculateProductivity(x.userPerformanceAverage, userTempomatValuesFirst.lagBehindPercentage);

                const avgPerformancePercentage = companyAvgPerformancePercentages
                    .find(capp => capp.companyId === x.companyId);

                if (!avgPerformancePercentage)
                    return null;

                const avgProductivityPercentage = companyAvgProductivity
                    .find(cap => cap.companyId === x.companyId);

                if (!avgProductivityPercentage)
                    return null;

                return instantiate<UserFlagCalculationType>({
                    ...x,
                    userProductivity: userProductivity,
                    companyAvgPerformancePercentage: avgPerformancePercentage.avgPerformancePercentage,
                    companyAvgProductivityPercentage: avgProductivityPercentage.avgProductivityPercentage
                });
            });
    }

    calculateProductivity(avgPerformancePercentage: number, avgLagBehindPercentage: number) {

        const lagBehindPoints = 100 - avgLagBehindPercentage;

        const productivityPercentage = avgPerformancePercentage / lagBehindPoints > 1
            ? lagBehindPoints * (avgPerformancePercentage / lagBehindPoints) * avgPerformancePercentage / 100
            : lagBehindPoints * avgPerformancePercentage / 100;

        const compensatedProductivityPerformance = avgPerformancePercentage < 60 && lagBehindPoints > 100
            ? avgPerformancePercentage
            : productivityPercentage;

        return compensatedProductivityPerformance;
    }

    private _calculateCompanyAvgPerformance(companyUserPerformances: CompanyUserPerformance[]) {

        const companyUserPerformanceGroups = companyUserPerformances
            .groupBy(x => x.companyId);

        return companyUserPerformanceGroups
            .map(x => {

                return {
                    companyId: x.first.companyId,
                    avgPerformancePercentage: (() => {

                        return getArrayAverage(x.items
                            .filter(y => y.performancePercentage !== 0)
                            .map(y => {
                                return y.performancePercentage;
                            })
                        );
                    })()
                };
            });
    }

    private _calculateCompanyAvgLagBehindPercentages(companyTempomatCalculationDatas: CompanyTempomatCalculationData[]) {

        const companyTempomatCalculationDataGroups = companyTempomatCalculationDatas
            .groupBy(x => x.companyId);

        return companyTempomatCalculationDataGroups
            .map(x => {

                return {
                    companyId: x.first.companyId,
                    avgLagBehindPercentage: (() => {
                        const lagBehindAverages = x.items
                            .map(y => {

                                return this._tempomatService
                                    .calculateTempomatValues({
                                        originalPrevisionedCompletionDate: y.originalPrevisionedCompletionDate,
                                        totalItemCount: y.totalItemCount,
                                        totalCompletedItemCount: y.totalCompletedItemCount,
                                        startDate: y.startDate,
                                        tempomatMode: y.tempomatMode,
                                        tempomatAdjustmentValue: y.tempomatAdjustmentValue,
                                        requiredCompletionDate: y.requiredCompletionDate
                                    }).lagBehindPercentage;
                            });

                        // filter out NaN values
                        return getArrayAverage(lagBehindAverages
                            .filter(lba => lba));
                    })()
                };
            });
    }

    /**
     * Calculates the companies avg productivity values,
     * from the company avg performance and company avg
     * lag behind.
     * 
     * @param companyAvgPerformancePercentage 
     * @param companyAvgLagBehindPercentage 
     */
    private _calculateCompanyProductivity(
        companyAvgPerformancePercentage: {
            companyId: Id<'Company'>,
            avgPerformancePercentage: number
        }[],
        companyAvgLagBehindPercentage: {
            companyId: Id<'Company'>,
            avgLagBehindPercentage: number
        }[]
    ) {

        const companyProductivityBaseValues = mergeArraysByKey(
            companyAvgPerformancePercentage,
            companyAvgLagBehindPercentage,
            'companyId'
        );

        return companyProductivityBaseValues.map(x => {
            return {
                companyId: x.companyId,
                avgProductivityPercentage: this
                    .calculateProductivity(x.avgPerformancePercentage, x.avgLagBehindPercentage)
            };
        });
    }
}
