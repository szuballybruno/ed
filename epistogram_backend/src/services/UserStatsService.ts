import { User } from '../models/entity/misc/User';
import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { HomePageStatsView } from '../models/views/HomePageStatsView';
import { ImproveYourselfPageStatsView } from '../models/views/ImproveYourselfPageStatsView';
import { MostProductiveTimeRangeView } from '../models/views/MostProductiveTimeRangeView';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { UserCourseStatsView, UserCourseStatsViewWithTempomatData } from '../models/views/UserCourseStatsView';
import { UserDailyActivityChartView } from '../models/views/UserDailyActivityChartView';
import { UserExamStatsView } from '../models/views/UserExamStatsView';
import { UserLearningOverviewStatsView } from '../models/views/UserLearningOverviewStatsView';
import { UserLearningPageStatsView } from '../models/views/UserLearningPageStatsView';
import { UserOverviewView } from '../models/views/UserOverviewView';
import { UserPerformanceComparisonStatsView } from '../models/views/UserPerformanceComparisonStatsView';
import { UserPerformanceView } from '../models/views/UserPerformanceView';
import { UserSpentTimeRatioView } from '../models/views/UserSpentTimeRatioView';
import { UserVideoStatsView } from '../models/views/UserVideoStatsView';
import { CourseLearningDTO } from '../shared/dtos/CourseLearningDTO';
import { HomePageStatsDTO } from '../shared/dtos/HomePageStatsDTO';
import { ImproveYourselfPageStatsDTO } from '../shared/dtos/ImproveYourselfPageStatsDTO';
import { UserCourseStatsDTO } from '../shared/dtos/UserCourseStatsDTO';
import { UserCourseStatsOverviewDTO } from '../shared/dtos/UserCourseStatsOverviewDTO';
import { UserExamStatsDTO } from '../shared/dtos/UserExamStatsDTO';
import { UserLearningOverviewDataDTO } from '../shared/dtos/UserLearningOverviewDataDTO';
import { UserLearningPageStatsDTO } from '../shared/dtos/UserLearningPageStatsDTO';
import { UserOverviewDTO } from '../shared/dtos/UserOverviewDTO';
import { UserVideoStatsDTO } from '../shared/dtos/UserVideoStatsDTO';
import { instantiate } from '../shared/logic/sharedLogic';
import { Id } from '../shared/types/versionId';
import { adjustByPercentage, dateDiffInDays, getArrayAverage, mergeArraysByKey } from '../utilities/helpers';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { CompanyService } from './CompanyService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { CalculatedTempomatValueTypeWithUserId, TempomatService } from './TempomatService';
import { UserProgressService } from './UserProgressService';

interface UserFlagCalculationType extends UserPerformanceComparisonStatsView {
    userProductivity: number
}

type UserFlagType = 'low' | 'avg' | 'high'

export class UserStatsService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _tempomatService: TempomatService;
    private _authorizationService: AuthorizationService;
    private _userProgressService: UserProgressService;
    private _companyService: CompanyService;

    constructor(
        ormService: ORMConnectionService,
        mapperSvc: MapperService,
        tempomatService: TempomatService,
        authorizationService: AuthorizationService,
        userProgressService: UserProgressService,
        companyService: CompanyService) {

        this._ormService = ormService;
        this._mapperService = mapperSvc;
        this._tempomatService = tempomatService;
        this._authorizationService = authorizationService;
        this._userProgressService = userProgressService;
        this._companyService = companyService;
    }

    getHomePageStatsAsync(principalId: PrincipalId) {

        return {
            action: async () => {

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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    getUserLearningPageStatsAsync(principalId: PrincipalId) {

        return {
            action: async () => {

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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    getImproveYourselfPageStatsAsync(principalId: PrincipalId) {

        return {
            action: async () => {
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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    /**
     * Gets the statistics for the users every course
     * TODO: Filter courses by permissions
     * TODO: Rearrange the view, so when the user hasn't
     *       started a course yet, return all the courses with empty
     *       data, instead of []
     */
    getUserCourseStatsAsync(principalId: PrincipalId, userId: Id<'User'>) {

        return {
            action: async () => {

                const stats = await this._ormService
                    .query(UserCourseStatsView, { userId })
                    .where('userId', '=', 'userId')
                    .getMany();

                const statsWithTempomatData = stats
                    .map((x): UserCourseStatsViewWithTempomatData => {

                        const tempomatValues = this
                            ._tempomatService
                            .calculateTempomatValues(x);

                        const previsionedCompletionDate = tempomatValues?.previsionedCompletionDate ?? null;
                        const lagBehindPercentage = tempomatValues?.lagBehindPercentage ?? null;
                        const recommendedItemsPerWeek = tempomatValues?.recommendedItemsPerWeek ?? null;

                        // TODO nullable

                        return {
                            ...x,
                            previsionedCompletionDate: previsionedCompletionDate!,
                            lagBehindPercentage: lagBehindPercentage!,
                            recommendedItemsPerWeek: recommendedItemsPerWeek!
                        };
                    });

                return this._mapperService
                    .mapTo(UserCourseStatsDTO, [statsWithTempomatData]);
            },
            auth: async () => {

                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_ADMIN');
            }
        };
    }

    /**
     * Gets the statistics for the users every watched video
     */
    getUserVideoStatsAsync(principalId: PrincipalId, courseId: Id<'Course'>, userId: Id<'User'>) {

        return {
            action: async () => {

                const stats = await this._ormService
                    .query(UserVideoStatsView, { userId, courseId })
                    .where('userId', '=', 'userId')
                    .and('courseId', '=', 'courseId')
                    .getMany();

                return this._mapperService
                    .mapTo(UserVideoStatsDTO, [stats]);
            },
            auth: async () => {

                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_ADMIN');
            }
        };

    }

    /**
     * Gets the statistics for the users every completed exam
     */

    getUserExamStatsAsync(principalId: PrincipalId, courseId: Id<'Course'>, userId: Id<'User'>) {

        return {
            action: async () => {

                const stats = await this._ormService
                    .query(UserExamStatsView, { userId, courseId })
                    .where('userId', '=', 'userId')
                    .and('courseId', '=', 'courseId')
                    .getMany();

                return this._mapperService
                    .mapTo(UserExamStatsDTO, [stats]);
            },
            auth: async () => {

                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_ADMIN');
            }
        };

    }

    /**
     * Gets the learning overview statistics data for single user
     * TODO: Correct mapping
     */
    getUserLearningOverviewDataAsync(principalId: PrincipalId, userId: Id<'User'>) {

        return {
            action: async () => {
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
            },
            auth: async () => {

                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_ADMIN');
            }
        };

    }

    getUserCourseStatsOverviewData = (
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        userId: Id<'User'>
    ) => {

        return {
            action: async () => {

                const currentUserId = userId
                    ? userId
                    : principalId.getId();

                const courseStats = await this._ormService
                    .query(UserCourseStatsView, { userId: currentUserId, courseId })
                    .where('userId', '=', 'userId')
                    .and('courseId', '=', 'courseId')
                    .getSingle();

                const userSpentTimeRatio = await this._ormService
                    .query(UserSpentTimeRatioView, { userId: currentUserId })
                    .where('userId', '=', 'userId')
                    .getSingle();

                const progressChartData = await this._userProgressService
                    .getProgressChartDataAsync(principalId, courseId, currentUserId)
                    .action();

                return this._mapperService
                    .mapTo(UserCourseStatsOverviewDTO, [courseStats, userSpentTimeRatio, progressChartData as any]);

            },
            auth: async () => {

                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_ADMIN');
            }
        };

    };

    async getUserOverviewStatsAsync(principalId: PrincipalId, isToBeReviewed: boolean) {

        const principalCompanyId = await this._companyService
            .getPrincipalCompanyId(principalId);

        const userOverviewViews = await this._ormService
            .query(UserOverviewView, { principalCompanyId })
            .where('companyId', '=', 'principalCompanyId')
            .getMany();

        const tempomatCalculationViews = await this._ormService
            .query(TempomatCalculationDataView, { principalCompanyId })
            .innerJoin(User, x => x
                .on('companyId', '=', 'principalCompanyId')
                .and('id', '=', 'userId', TempomatCalculationDataView))
            .getMany();


        const userIdsWithLagBehindAvgs = tempomatCalculationViews
            .groupBy(x => x.userId)
            .map(x => {

                const lagBehindAvg = this._tempomatService
                    .getAvgLagBehindPercentage(x.items);

                return {
                    userId: x.first.userId,
                    lagBehindAvg
                };
            });

        const userOverviewViewsWithLagBehind = mergeArraysByKey(userOverviewViews, userIdsWithLagBehindAvgs, 'userId');

        const userOverviewWithProductivity = userOverviewViewsWithLagBehind
            .groupBy(x => x.userId)
            .map(x => {

                const first = x.first;

                const productivityPercentage = this
                    .calculateProductivity(first.averagePerformancePercentage, first.lagBehindAvg);

                return {
                    ...first,
                    productivityPercentage,
                    invertedLagBehind: first.lagBehindAvg
                        ? 100 - first.lagBehindAvg
                        : null
                };
            });

        const allFlaggedUsers = await this
            ._flagUsersAsync(principalCompanyId);

        if (!allFlaggedUsers)
            return;

        const flaggedUsersOnly = userOverviewWithProductivity
            .filter(x => allFlaggedUsers
                .filter(x => x?.flag === 'low')
                .some(y => y?.userId === x.userId));


        return this._mapperService
            .mapTo(UserOverviewDTO, [isToBeReviewed ? flaggedUsersOnly : userOverviewWithProductivity]);

    }

    async getAdminHomeOverviewStatsAsync(companyId: Id<'Company'>) {

        const allFlaggedUsers = await this
            ._flagUsersAsync(companyId);

        if (!allFlaggedUsers)
            return;

        const flaggedUsers = allFlaggedUsers
            .filter(x => x?.flag === 'low');

        const avgUsers = allFlaggedUsers
            .filter(x => x?.flag === 'avg');

        const outstandingUsers = allFlaggedUsers
            .filter(x => x?.flag === 'high');
    }

    private async _flagUsersAsync(companyId: Id<'Company'>) {

        const userPerformanceViews = await this._ormService
            .query(UserPerformanceView, { companyId })
            .innerJoin(User, x => x
                .on('companyId', '=', 'companyId')
                .and('id', '=', 'userId', UserPerformanceView))
            .getMany();

        if (!userPerformanceViews) {
            return;
        }

        const tempomatCalculationViews = await this._ormService
            .query(TempomatCalculationDataView, { companyId })
            .innerJoin(User, x => x
                .on('companyId', '=', 'companyId')
                .and('id', '=', 'userId', TempomatCalculationDataView))
            .getMany();

        const statsViews = await this._ormService
            .query(UserPerformanceComparisonStatsView, { companyId })
            .where('companyId', '=', 'companyId')
            .getMany();

        const companyAvgPerformancePercentage = this
            ._calculateCompanyAvgPerformance(userPerformanceViews);

        const companyTempomatValues = this._tempomatService
            .calculateCompanyTempomatValues(tempomatCalculationViews);

        const companyLagBehindPercentages = this._tempomatService
            .calculateCompanyLagBehinds(companyTempomatValues);

        const companyAvgLagBehindPercentage =
            getArrayAverage(companyLagBehindPercentages);

        const companyProductivity = this
            ._calculateCompanyProductivity(companyAvgPerformancePercentage, companyAvgLagBehindPercentage);

        const userFlagCalculationData = this
            ._createUserFlagCalculationData(statsViews, companyTempomatValues);

        return this
            ._flagUsers(userFlagCalculationData, companyAvgPerformancePercentage, companyProductivity);
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
        calculationData: (UserFlagCalculationType | null)[],
        companyAvgPerformancePercentage: number,
        companyAvgProductivityPercentage: number
    ): ({ userId: Id<'User'>, flag: UserFlagType } | null)[] {

        return calculationData
            .map(x => {

                if (!x)
                    return null;

                // number of days from signup
                const daysFromSignup = dateDiffInDays(x.creationDate, new Date(Date.now()));

                // defining company avg performance min and max values
                const companyPerformanceAverageMinValue = adjustByPercentage(companyAvgPerformancePercentage, -15);
                const companyPerformanceAverageMaxValue = adjustByPercentage(companyAvgPerformancePercentage, 5);

                // defining company avg productivity min and max values
                const companyProductivityAverageMinValue = adjustByPercentage(companyAvgProductivityPercentage, -15);
                const companyProductivityAverageMaxValue = adjustByPercentage(companyAvgProductivityPercentage, 5);

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
        companyTempomatValues: CalculatedTempomatValueTypeWithUserId[]
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

                return instantiate<UserFlagCalculationType>({
                    ...x,
                    userProductivity: userProductivity
                });
            });
    }

    private calculateProductivity(avgPerformancePercentage: number, avgLagBehindPercentage: number) {

        const lagBehindPoints = 100 - avgLagBehindPercentage;

        const productivityPercentage = avgPerformancePercentage / lagBehindPoints > 1
            ? lagBehindPoints * (avgPerformancePercentage / lagBehindPoints) * avgPerformancePercentage / 100
            : lagBehindPoints * avgPerformancePercentage / 100;

        const compensatedProductivityPerformance = avgPerformancePercentage < 60 && lagBehindPoints > 100
            ? avgPerformancePercentage
            : productivityPercentage;

        return compensatedProductivityPerformance;
    }

    private _calculateCompanyAvgPerformance(userPerformanceViews: UserPerformanceView[]) {
        return getArrayAverage(
            userPerformanceViews
                .map(x => x.performancePercentage));
    }

    private _calculateCompanyProductivity(companyAvgPerformancePercentage: number, companyAvgLagBehindPercentage: number) {

        return this
            .calculateProductivity(companyAvgPerformancePercentage, companyAvgLagBehindPercentage);
    }

}
