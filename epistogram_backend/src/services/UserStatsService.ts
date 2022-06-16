
import { Course } from '../models/entity/Course';
import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { UserCourseStatsView, UserCourseStatsViewWithTempomatData } from '../models/views/UserCourseStatsView';
import { UserExamStatsView } from '../models/views/UserExamStatsView';
import { UserLearningOverviewStatsView } from '../models/views/UserLearningOverviewStatsView';
import { UserSpentTimeRatioView } from '../models/views/UserSpentTimeRatioView';
import { UserStatsView } from '../models/views/UserStatsView';
import { UserVideoStatsView } from '../models/views/UserVideoStatsView';
import { CourseLearningDTO } from '../shared/dtos/CourseLearningDTO';
import { UserCourseStatsDTO } from '../shared/dtos/UserCourseStatsDTO';
import { UserExamStatsDTO } from '../shared/dtos/UserExamStatsDTO';
import { UserLearningOverviewDataDTO } from '../shared/dtos/UserLearningOverviewDataDTO';
import { UserStatsDTO } from '../shared/dtos/UserStatsDTO';
import { UserVideoStatsDTO } from '../shared/dtos/UserVideoStatsDTO';
import { TempomatModeType } from '../shared/types/sharedTypes';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TempomatService } from './TempomatService';

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

    async getUserStatsAsync(userId: number) {

        const stats = await this._ormService
            .getRepository(UserStatsView)
            .createQueryBuilder('usv')
            .where('"usv"."user_id" = :userId', { userId })
            .getOneOrFail();

        return this._mapperService
            .map(UserStatsView, UserStatsDTO, stats);
    }

    /**
     * Gets the statistics for the users every course
     * @param userId 
     * @returns
     * 
     * TODO: Filter courses by permissions
     * TODO: Rearrange the view, so when the user hasn't
     *       started a course yet, return all the courses with empty
     *       data, instead of [] 
     */
    async getUserCourseStatsAsync(userId: number) {

        const stats = await this._ormService
            .getRepository(UserCourseStatsView)
            .createQueryBuilder('ucsv')
            .where('"ucsv"."user_id" = :userId', { userId })
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
     * @param userId 
     * @returns
     */
    async getUserVideoStatsAsync(userId: number, courseId: number) {

        const stats = await this._ormService
            .getRepository(UserVideoStatsView)
            .createQueryBuilder('uvsv')
            .where('"uvsv"."user_id" = :userId', { userId, courseId })
            .andWhere('"uvsv"."course_id" = :courseId')
            .getMany();

        return this._mapperService
            .mapMany(UserVideoStatsView, UserVideoStatsDTO, stats);
    }

    /**
     * Gets the statistics for the users every completed exam
     * @param userId 
     * @returns
     */

    async getUserExamStatsAsync(userId: number, courseId: number) {

        const stats = await this._ormService
            .getRepository(UserExamStatsView)
            .createQueryBuilder('uesv')
            .where('"uesv"."user_id" = :userId', { userId, courseId })
            .andWhere('"uesv"."course_id" = :courseId')
            .getMany();

        return this._mapperService
            .mapMany(UserExamStatsView, UserExamStatsDTO, stats);
    }

    /**
     * Gets the learning overview statistics data for single user
     * @param userId 
     * @returns 
     * 
     * TODO: Correct mapping
     */
    getUserLearningOverviewDataAsync = async (userId: number) => {

        const userSpentTimeRatio = await this._ormService
            .query(UserSpentTimeRatioView, { userId })
            .where('userId', '=', 'userId')
            .getOneOrNull();

        const courses = await this._ormService
            .query(CourseLearningStatsView, { userId })
            .innerJoin(Course, x => x
                .on('id', '=', 'courseId', CourseLearningStatsView)
                .and('deletionDate', 'IS', 'NULL'))
            .where('userId', '=', 'userId')
            .getMany();

        // in progress courses 
        const inProgressCourses = courses
            .filter(x => x.isStarted && !x.isCompleted);

        const inProgressCoursesAsCourseShortDTOs = this._mapperService
            .mapMany(CourseLearningStatsView, CourseLearningDTO, inProgressCourses);

        const stats = await this._ormService
            .getRepository(UserLearningOverviewStatsView)
            .createQueryBuilder('ulosv')
            .where('"ulosv"."user_id" = :userId', { userId })
            .getOneOrFail();

        return {
            overallPerformancePercentage: stats.overallPerformancePercentage,

            performancePercentage: stats.performancePercentage,
            userReactionTimeDifferencePercentage: stats.userReactionTimeDifferencePercentage,
            reactionTimeScorePoints: stats.totalUserReactionTimePoints,

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
}