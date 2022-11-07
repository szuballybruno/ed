import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class UserLearningOverviewStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    userEmail: string;

    @XViewColumn()
    overallPerformancePercentage: number;

    @XViewColumn()
    engagementPoints: number;

    @XViewColumn()
    performancePercentage: number;

    @XViewColumn()
    totalUserReactionTimePoints: number;

    @XViewColumn()
    userExamLengthPoints: number;

    @XViewColumn()
    userReactionTimePoints: number;

    @XViewColumn()
    totalTimeActiveOnPlatformSeconds: number;

    @XViewColumn()
    watchedVideos: number;

    @XViewColumn()
    answeredVideoAndPractiseQuizQuestions: number;

    @XViewColumn()
    correctAnsweredVideoAndPractiseQuizQuestions: number;

    @XViewColumn()
    correctAnswerRatePercentage: number;

    @XViewColumn()
    userReactionTimeDifferencePercentage: number;

    @XViewColumn()
    averageWatchedVideosPerDay: number;

    @XViewColumn()
    mostFrequentTimeRange: string;

    @XViewColumn()
    averageSessionLengthSeconds: number;

    @XViewColumn()
    totalDoneExams: number;

    @XViewColumn()
    videosToBeRepeatedCount: number;
}
