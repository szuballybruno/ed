
import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { HomePageStatsView } from '../models/views/HomePageStatsView';
import { ImproveYourselfPageStatsView } from '../models/views/ImproveYourselfPageStatsView';
import { MostProductiveTimeRangeView } from '../models/views/MostProductiveTimeRangeView';
import { UserCourseStatsView, UserCourseStatsViewWithTempomatData } from '../models/views/UserCourseStatsView';
import { UserDailyActivityChartView } from '../models/views/UserDailyActivityChartView';
import { UserExamStatsView } from '../models/views/UserExamStatsView';
import { UserLearningOverviewStatsView } from '../models/views/UserLearningOverviewStatsView';
import { UserLearningPageStatsView } from '../models/views/UserLearningPageStatsView';
import { UserPerformanceView } from '../models/views/UserPerformanceView';
import { UserSpentTimeRatioView } from '../models/views/UserSpentTimeRatioView';
import { UserVideoStatsView } from '../models/views/UserVideoStatsView';
import { CourseLearningDTO } from '../shared/dtos/CourseLearningDTO';
import { HomePageStatsDTO } from '../shared/dtos/HomePageStatsDTO';
import { ImproveYourselfPageStatsDTO } from '../shared/dtos/ImproveYourselfPageStatsDTO';
import { UserCourseStatsDTO } from '../shared/dtos/UserCourseStatsDTO';
import { UserExamStatsDTO } from '../shared/dtos/UserExamStatsDTO';
import { UserLearningOverviewDataDTO } from '../shared/dtos/UserLearningOverviewDataDTO';
import { UserLearningPageStatsDTO } from '../shared/dtos/UserLearningPageStatsDTO';
import { UserVideoStatsDTO } from '../shared/dtos/UserVideoStatsDTO';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { AuthorizationService } from './AuthorizationService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TempomatService } from './TempomatService';

export class UserStatsService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _tempomatService: TempomatService;
    private _authorizationService: AuthorizationService;

    constructor(
        ormService: ORMConnectionService,
        mapperSvc: MapperService,
        tempomatService: TempomatService,
        authorizationService: AuthorizationService) {

        this._ormService = ormService;
        this._mapperService = mapperSvc;
        this._tempomatService = tempomatService;
        this._authorizationService = authorizationService;
    }

    getHomePageStatsAsync(principalId: PrincipalId): ControllerActionReturnType {

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
                    .getAvgLagBehindPercentage(userId);

                return this._mapperService
                    .mapTo(HomePageStatsDTO, [stats, avgLagBehindPercentage]);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    getUserLearningPageStatsAsync(principalId: PrincipalId): ControllerActionReturnType {

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
                    .getAvgLagBehindPercentage(userId);

                return this
                    ._mapperService
                    .mapTo(UserLearningPageStatsDTO, [stats, avgLagBehindPercentage]);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    getImproveYourselfPageStatsAsync(principalId: PrincipalId): ControllerActionReturnType {

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
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
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
    getUserCourseStatsAsync(principalId: PrincipalId, userId: Id<'User'>): ControllerActionReturnType {

        return {
            action: async () => {
                const stats = await this._ormService
                    .query(UserCourseStatsView, { userId })
                    .where('userId', '=', 'userId')
                    .getMany();

                const statsWithTempomatData = stats
                    .map(x => {

                        const tempomatValues = this._tempomatService
                            .calculateTempomatValues(x);

                        const previsionedCompletionDate = tempomatValues?.previsionedCompletionDate || null;
                        const lagBehindPercentage = tempomatValues?.lagBehindPercentage || null;
                        const recommendedItemsPerWeek = tempomatValues?.recommendedItemsPerWeek || null;

                        return {
                            ...x,
                            previsionedCompletionDate: previsionedCompletionDate,
                            lagBehindPercentage: lagBehindPercentage,
                            recommendedItemsPerWeek
                        };
                    }) as UserCourseStatsViewWithTempomatData[];

                return this._mapperService
                    .mapTo(UserCourseStatsDTO, [statsWithTempomatData]);
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_ADMIN');
            }
        };
    }

    /**
     * Gets the statistics for the users every watched video
     */
    getUserVideoStatsAsync(principalId: PrincipalId, courseId: Id<'Course'>): ControllerActionReturnType {

        return {
            action: async () => {

                const userId = principalId.toSQLValue();

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
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_ADMIN');
            }
        };


    }

    /**
     * Gets the statistics for the users every completed exam
     */

    getUserExamStatsAsync(principalId: PrincipalId, courseId: Id<'Course'>): ControllerActionReturnType {

        return {
            action: async () => {

                const userId = principalId.toSQLValue();

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
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_ADMIN');
            }
        };


    }

    /**
     * Gets the learning overview statistics data for single user
     * TODO: Correct mapping
     */
    getUserLearningOverviewDataAsync(principalId: PrincipalId, userId: Id<'User'>): ControllerActionReturnType {

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
                    .calculateProductivityAsync(userId);

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
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_ADMIN');
            }
        };


    }

    calculateProductivityAsync = async (userId: Id<'User'>) => {

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
            .getAvgLagBehindPercentage(userId) || 0;

        const lagBehindPoints = 100 - avgLagBehindPercentage;

        const productivityPercentage = avgPerformancePercentage / lagBehindPoints > 1
            ? lagBehindPoints * (avgPerformancePercentage / lagBehindPoints) * avgPerformancePercentage / 100
            : lagBehindPoints * avgPerformancePercentage / 100;

        const compensatedProductivityPerformance = avgPerformancePercentage < 60 && lagBehindPoints > 100
            ? avgPerformancePercentage
            : productivityPercentage;

        return compensatedProductivityPerformance;
    };
}