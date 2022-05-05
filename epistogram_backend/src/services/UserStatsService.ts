
import { UserLearningOverviewStatsView } from '../models/views/UserLearningOverviewStatsView';
import { UserStatsView } from '../models/views/UserStatsView';
import { UserStatsDTO } from '../shared/dtos/UserStatsDTO';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UserPerformanceView } from '../models/views/UserPerformanceView';
import { UserLearningOverviewDataDTO } from '../shared/dtos/UserLearningOverviewDataDTO';
import { UserCoursesDataDTO } from '../shared/dtos/UserCoursesDataDTO';
import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { Course } from '../models/entity/Course';
import { CourseLearningDTO } from '../shared/dtos/CourseLearningDTO';

export class UserStatsService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperSvc: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperSvc;
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
     * Gets the learning overview statistics data for single user
     * @param userId 
     * @returns 
     */
    getUserLearningOverviewDataAsync = async (userId: number) => {

        const courses = await this._ormService
            .query(CourseLearningStatsView, { userId })
            .leftJoin(Course, CourseLearningStatsView)
            .on('id', '=', 'courseId')
            .where('userId', '=', 'userId')
            .and(Course, 'deletionDate', 'IS', 'NULL')
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
            userAverageReactionTimeSeconds: stats.userAverageReactionTimeSeconds,
            totalUsersAverageReactionTimeSeconds: stats.totalUsersAverageReactionTimeSeconds,
            userReactionTimeDifferenceSeconds: stats.userReactionTimeDifferenceSeconds,
            reactionTimeScorePoints: this.getSingleUserResponseTimePoints(stats.userAverageReactionTimeSeconds, stats.totalUsersAverageReactionTimeSeconds),

            isAnyCoursesInProgress: inProgressCourses.any(x => true),
            inProgressCourses: inProgressCoursesAsCourseShortDTOs,

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

    private getSingleUserResponseTimePoints = (
        currentUserResponseTimeAverageSeconds: number,
        usersResponseTimeAverageSeconds: number
    ) => {
        const difference = currentUserResponseTimeAverageSeconds - usersResponseTimeAverageSeconds;
        const absDifference = Math.abs(difference);
        const onePercentDifference = usersResponseTimeAverageSeconds / 100;

        let points: number | null = 0;

        switch (true) {

            case absDifference < onePercentDifference * 15 && absDifference > 0:
                points += 50;
                break;

            case difference > onePercentDifference * 15 && difference < onePercentDifference * 30:
                points += 30;
                break;

            case difference > onePercentDifference * 30 && difference < onePercentDifference * 40:
                points += 25;
                break;

            case difference > onePercentDifference * 45 && difference < onePercentDifference * 55:
                points += 20;
                break;

            case difference > onePercentDifference * 55 && difference < onePercentDifference * 65:
                points += 10;
                break;

            case difference < -(onePercentDifference * 15) && difference > -(onePercentDifference * 25):
                points += 65;
                break;

            case difference < -(onePercentDifference * 25) && difference > -(onePercentDifference * 35):
                points += 80;
                break;

            case difference < -(onePercentDifference * 35) && difference > -(onePercentDifference * 50):
                points += 90;
                break;

            case difference < -(onePercentDifference * 50):
                points += 100;
                break;

            default:
                points = null;
                break;

        }

        return points;
    };
}