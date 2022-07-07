
import { CourseData } from '../models/entity/course/CourseData';
import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { UserCourseStatsView, UserCourseStatsViewWithTempomatData } from '../models/views/UserCourseStatsView';
import { UserExamStatsView } from '../models/views/UserExamStatsView';
import { UserLearningOverviewStatsView } from '../models/views/UserLearningOverviewStatsView';
import { UserSpentTimeRatioView } from '../models/views/UserSpentTimeRatioView';
import { UserLearningPageStatsView } from '../models/views/UserLearningPageStatsView';
import { UserVideoStatsView } from '../models/views/UserVideoStatsView';
import { CourseLearningDTO } from '../shared/dtos/CourseLearningDTO';
import { UserCourseStatsDTO } from '../shared/dtos/UserCourseStatsDTO';
import { UserExamStatsDTO } from '../shared/dtos/UserExamStatsDTO';
import { UserLearningOverviewDataDTO } from '../shared/dtos/UserLearningOverviewDataDTO';
import { UserLearningPageStatsDTO } from '../shared/dtos/UserLearningPageStatsDTO';
import { UserVideoStatsDTO } from '../shared/dtos/UserVideoStatsDTO';
import { TempomatModeType } from '../shared/types/sharedTypes';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TempomatService } from './TempomatService';
import { PrincipalId } from '../utilities/ActionParams';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { HomePageStatsView } from '../models/views/HomePageStatsView';
import { HomePageStatsDTO } from '../shared/dtos/HomePageStatsDTO';
import { ImproveYourselfPageStatsView } from '../models/views/ImproveYourselfPageStatsView';
import { ImproveYourselfPageStatsDTO } from '../shared/dtos/ImproveYourselfPageStatsDTO';
import { MostProductiveTimeRangeView } from '../models/views/MostProductiveTimeRangeView';
import { UserDailyActivityChartView } from '../models/views/UserDailyActivityChartView';
import { UserPerformanceView } from '../models/views/UserPerformanceView';

export class UserStatsService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _tempomatService: TempomatService;

    constructor(
        ormService: ORMConnectionService,
        mapperSvc: MapperService,
        tempomatService: TempomatService) {

        this._ormService = ormService;
        this._mapperService = mapperSvc;
        this._tempomatService = tempomatService;
    }

    async getHomePageStatsAsync(principalId: PrincipalId) {
        const userId = principalId.toSQLValue();

        const stats = await this._ormService
            .query(HomePageStatsView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        const tempomatCalculationData = await this._ormService
            .query(TempomatCalculationDataView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        if (!tempomatCalculationData)
            throw new Error('Couldn\'t get tempomat calculation data');

        const allLagBehindPercentages = tempomatCalculationData.map(x => {
            const previsionedCompletionDate = this._tempomatService
                .calculatePrevisionedDate(
                    x.originalPrevisionedCompletionDate,
                    x.totalItemCount,
                    x.totalCompletedItemCount,
                    x.startDate,
                    x.tempomatMode,
                    x.tempomatAdjustmentValue
                )

            const lagBehindPercentage = this._tempomatService
                .calculateLagBehindPercentage(
                    x.startDate,
                    x.requiredCompletionDate
                        ? x.requiredCompletionDate
                        : x.originalPrevisionedCompletionDate,
                    previsionedCompletionDate
                )

            return lagBehindPercentage || 0
        })

        const avgLagBehindPercentage = allLagBehindPercentages.reduce((a, b) => a + b, 0) / allLagBehindPercentages.length

        return this._mapperService
            .mapTo(HomePageStatsDTO, [stats, avgLagBehindPercentage])
    }

    async getUserLearningPageStatsAsync(principalId: PrincipalId) {

        const userId = principalId.toSQLValue();

        const stats = await this._ormService
            .query(UserLearningPageStatsView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        const tempomatCalculationData = await this._ormService
            .query(TempomatCalculationDataView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        if (!tempomatCalculationData)
            throw new Error('Couldn\'t get tempomat calculation data');

        const allLagBehindPercentages = tempomatCalculationData.map(x => {
            const previsionedCompletionDate = this._tempomatService
                .calculatePrevisionedDate(
                    x.originalPrevisionedCompletionDate,
                    x.totalItemCount,
                    x.totalCompletedItemCount,
                    x.startDate,
                    x.tempomatMode,
                    x.tempomatAdjustmentValue
                )

            const lagBehindPercentage = this._tempomatService
                .calculateLagBehindPercentage(
                    x.startDate,
                    x.requiredCompletionDate
                        ? x.requiredCompletionDate
                        : x.originalPrevisionedCompletionDate,
                    previsionedCompletionDate
                )

            return lagBehindPercentage || 0
        })

        const avgLagBehindPercentage = allLagBehindPercentages.reduce((a, b) => a + b, 0) / allLagBehindPercentages.length

        return this._mapperService.mapTo(UserLearningPageStatsDTO, [stats, avgLagBehindPercentage])
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
            .mapTo(ImproveYourselfPageStatsDTO, [stats, mostProductiveTimeRangeView, userDailyActivityChartView])

    }

    /**
     * Gets the statistics for the users every course
          * @returns
     * TODO: Filter courses by permissions
     * TODO: Rearrange the view, so when the user hasn't
     *       started a course yet, return all the courses with empty
     *       data, instead of [] 
     */
    async getUserCourseStatsAsync(userId: number) {

        const stats = await this._ormService
            .query(UserCourseStatsView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        const statsWithTempomatData = stats
            .map(x => {

                const previsionedCompletionDate = this._tempomatService
                    .calculatePrevisionedDate(
                        x.originalPrevisionedCompletionDate,
                        x.totalItemCount,
                        x.totalCompletedItemCount,
                        x.startDate,
                        x.tempomatMode,
                        x.tempomatAdjustmentValue
                    )

                const lagBehindPercentage = this._tempomatService
                    .calculateLagBehindPercentage(
                        x.startDate,
                        x.requiredCompletionDate
                            ? x.requiredCompletionDate
                            : x.originalPrevisionedCompletionDate,
                        previsionedCompletionDate
                    )

                const recommendedItemsPerDay = this._tempomatService
                    .calculateRecommendedItemsPerDay(
                        x.startDate,
                        previsionedCompletionDate,
                        x.requiredCompletionDate,
                        x.totalItemCount
                    )

                return {
                    ...x,
                    previsionedCompletionDate: previsionedCompletionDate,
                    lagBehindPercentage: lagBehindPercentage,
                    recommendedItemsPerWeek: recommendedItemsPerDay
                        ? recommendedItemsPerDay * 7
                        : null
                }
            }) as UserCourseStatsViewWithTempomatData[]

        return this._mapperService
            .mapTo(UserCourseStatsDTO, [statsWithTempomatData])
    }

    /**
     * Gets the statistics for the users every watched video
          * @returns
     */
    async getUserVideoStatsAsync(userId: number, courseId: number) {

        const stats = await this._ormService
            .query(UserVideoStatsView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        return this._mapperService
            .mapMany(UserVideoStatsView, UserVideoStatsDTO, stats);
    }

    /**
     * Gets the statistics for the users every completed exam
          * @returns
     */

    async getUserExamStatsAsync(userId: number, courseId: number) {

        const stats = await this._ormService
            .query(UserExamStatsView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        return this._mapperService
            .mapMany(UserExamStatsView, UserExamStatsDTO, stats);
    }

    /**
     * Gets the learning overview statistics data for single user
          * TODO: Correct mapping
     */
    getUserLearningOverviewDataAsync = async (userId: number) => {

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
            .mapMany(CourseLearningStatsView, CourseLearningDTO, inProgressCourses);

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
    };

    calculateProductivityAsync = async (userId: number) => {

        const userPerformanceView = await this._ormService
            .query(UserPerformanceView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        const userPerformanceViewFiltered = userPerformanceView
            .filter(x => {
                if (x.performancePercentage === 0)
                    return false

                if (x.performancePercentage === null)
                    return false

                return true;
            })

        const avgPerformancePercentage = userPerformanceViewFiltered
            .reduce((total, next) => total + next.performancePercentage, 0) / userPerformanceViewFiltered.length;

        const avgLagBehindPercentage = await this._tempomatService
            .calculateAvgLagBehindPercentageAsync(userId)

        const lagBehindPoints = 100 - avgLagBehindPercentage

        const productivityPercentage = avgPerformancePercentage / lagBehindPoints > 1
            ? lagBehindPoints * (avgPerformancePercentage / lagBehindPoints) * avgPerformancePercentage / 100
            : lagBehindPoints * avgPerformancePercentage / 100

        const compensatedProductivityPerformance = avgPerformancePercentage < 60 && lagBehindPoints > 100
            ? avgPerformancePercentage
            : productivityPercentage

        return compensatedProductivityPerformance;
    }
}