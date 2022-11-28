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
import { AdminCourseUserStatsDTO } from '@episto/communication';
import { AdminHomePageOverviewDTO } from '@episto/communication';
import { CourseLearningDTO } from '@episto/communication';
import { HomePageStatsDTO } from '@episto/communication';
import { ImproveYourselfPageStatsDTO } from '@episto/communication';
import { UserCourseStatsDTO } from '@episto/communication';
import { UserCourseStatsOverviewDTO } from '@episto/communication';
import { UserExamStatsDTO } from '@episto/communication';
import { UserLearningOverviewDataDTO } from '@episto/communication';
import { UserLearningPageStatsDTO } from '@episto/communication';
import { UserModuleStatsDTO } from '@episto/communication';
import { UserVideoStatsDTO } from '@episto/communication';
import { instantiate } from '@episto/commonlogic';
import { CourseUserPresetType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { adjustByPercentage, dateDiffInDays, getArrayAverage, mergeArraysByKey } from '../utilities/helpers';
import { PrincipalId } from '@episto/x-core';
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

type FlaggedUserType = {
    userId: Id<"User">;
    flag: UserFlagType;
};

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

        const avgRelativeUserPace = await this
            ._tempomatService
            .getAvgRelativeUserPaceDiffAsync(userId);

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
            .getAvgRelativeUserPaceDiffAsync(userId);

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

        const principalCompanyId = principalUser.companyId;

        const stats = await this._ormService
            .query(AdminCourseUserStatsView, { courseId, companyId: principalCompanyId })
            .where('courseId', '=', 'courseId')
            .and('companyId', '=', 'companyId')
            .getMany();

        const userLagBehinds = stats
            .map(x => {

                const previsionedCompletionDate = this._tempomatService
                    .calculateNewPrevisionedDate(
                        x.startDate,
                        new Date(Date.now()),
                        x.totalCompletedItemCount,
                        x.totalItemCount
                    )

                const actualLagBehindDays = (() => {

                    if (x.requiredCompletionDate)
                        return this._tempomatService
                            .calculateLagBehindDaysFromDeadline(
                                new Date(Date.now()),
                                x.requiredCompletionDate
                            )

                    if (x.originalPrevisionedCompletionDate)
                        return this._tempomatService
                            .calculateLagBehindDaysFromDeadline(
                                new Date(Date.now()),
                                x.originalPrevisionedCompletionDate
                            )

                    return null;
                })()

                const previsionedLagBehindDays = (() => {

                    if (!previsionedCompletionDate)
                        return null;

                    if (x.requiredCompletionDate)
                        return this._tempomatService
                            .calculatePrevisionedLagBehindDays(
                                x.requiredCompletionDate,
                                previsionedCompletionDate
                            )

                    if (x.originalPrevisionedCompletionDate)
                        return this._tempomatService
                            .calculatePrevisionedLagBehindDays(
                                x.originalPrevisionedCompletionDate,
                                previsionedCompletionDate
                            )

                    return null;
                })()

                return {
                    userId: x.userId,
                    courseId: x.courseId,
                    previsionedCompletionDate,
                    actualLagBehindDays,
                    previsionedLagBehindDays
                }
            })

        const mergedStats = (() => {

            return stats.map(x => {

                const previsionedDate = userLagBehinds
                    .find(pd => pd.userId === x.userId && pd.courseId === x.courseId)
                    ?.previsionedCompletionDate || null;

                const previsionedLagBehindDays = userLagBehinds
                    .find(lbd => lbd.userId === x.userId && lbd.courseId === x.courseId)
                    ?.previsionedLagBehindDays || null;

                const actualLagBehindDays = userLagBehinds
                    .find(lbd => lbd.userId === x.userId && lbd.courseId === x.courseId)
                    ?.actualLagBehindDays || null;

                return {
                    ...x,
                    previsionedDate: previsionedDate,
                    previsionedLagBehindDays: previsionedLagBehindDays,
                    actualLagBehindDays: actualLagBehindDays
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

        const productivityPercentage = await this
            .calculateUserProductivityAsync(userId);

        return {
            overallPerformancePercentage: stats.overallPerformancePercentage,

            performancePercentage: stats.performancePercentage,
            userReactionTimeDifferencePercentage: stats.userReactionTimeDifferencePercentage,
            reactionTimeScorePoints: stats.totalUserReactionTimePoints,
            productivityPercentage: productivityPercentage,

            isAnyCoursesInProgress: inProgressCourses.some(x => true),
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

        return this._mapperService
            .mapTo(AdminHomePageOverviewDTO, [companyCourseStats, flaggedUsers, avgUsers, outstandingUsers]);
    }

    async flagUsersAsync(companyId: Id<'Company'> | null, allowedFlagType?: UserFlagType): Promise<FlaggedUserType[]> {

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

        const companyAvgPerformancePercentages = this
            ._calculateCompanyAvgPerformance(userPerformanceViews);

        const companyTempomatValues = this._tempomatService
            .calculateCompanyTempomatValues(tempomatCalculationViews);

        const companyAvgRelativeUserPaceDiffs = this
            ._calculateCompanyAvgRelativeUserPaceDiffs(tempomatCalculationViews);

        const companyAvgProductivity = this
            ._calculateCompanyProductivity(companyAvgPerformancePercentages, companyAvgRelativeUserPaceDiffs);

        const userFlagCalculationData = this
            ._createUserFlagCalculationData(
                performanceComparisonStatsViews,
                companyTempomatValues,
                companyAvgPerformancePercentages,
                companyAvgProductivity);

        const flaggedUsers = this
            ._flagUsers(userFlagCalculationData);

        if (!flaggedUsers)
            throw new Error('No flagged users.');

        const nonNullUsers = flaggedUsers
            .filter(x => !!x)
            .map(x => x!);

        if (!allowedFlagType)
            return nonNullUsers;

        return nonNullUsers
            .filter(x => x.flag === allowedFlagType);
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
            .getAvgRelativeUserPaceDiffAsync(userId) || 0;

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
                    .calculateProductivity(x.userPerformanceAverage, userTempomatValuesFirst.relativeUserPaceDiff);

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

    calculateProductivity(avgPerformancePercentage: number, avgRelativeUserPaceDiff: number) {

        const lagBehindPoints = (() => {

            if (avgRelativeUserPaceDiff >= 100)
                return 0;

            if (avgRelativeUserPaceDiff <= -100)
                return 200;

            return 100 - avgRelativeUserPaceDiff;
        })();

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

    private _calculateCompanyAvgRelativeUserPaceDiffs(companyTempomatCalculationDatas: CompanyTempomatCalculationData[]) {

        const companyTempomatCalculationDataGroups = companyTempomatCalculationDatas
            .groupBy(x => x.companyId);

        return companyTempomatCalculationDataGroups
            .map(x => {

                return {
                    companyId: x.first.companyId,
                    avgRelativeUserPaceDiff: (() => {
                        const relativeUserPaceDiffAverages = x.items
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
                                    }).relativeUserPaceDiff;
                            });

                        // filter out NaN values
                        return getArrayAverage(relativeUserPaceDiffAverages
                            .filter(rupda => rupda));
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
     * @param companyAvgUserPaceDiffs 
     */
    private _calculateCompanyProductivity(
        companyAvgPerformancePercentage: {
            companyId: Id<'Company'>,
            avgPerformancePercentage: number
        }[],
        companyAvgUserPaceDiffs: {
            companyId: Id<'Company'>,
            avgRelativeUserPaceDiff: number
        }[]
    ) {

        const companyProductivityBaseValues = mergeArraysByKey(
            companyAvgPerformancePercentage,
            companyAvgUserPaceDiffs,
            'companyId'
        );

        return companyProductivityBaseValues.map(x => {
            return {
                companyId: x.companyId,
                avgProductivityPercentage: this
                    .calculateProductivity(x.avgPerformancePercentage, x.avgRelativeUserPaceDiff)
            };
        });
    }
}
