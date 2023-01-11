import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class UserLearningOverviewStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    userEmail: string;

    @XViewColumn()
    performancePercentage: number;

    @XViewColumn()
    mostFrequentTimeRange: string;

    @XViewColumn()
    engagementPoints: number;

    @XViewColumn()
    totalTimeActiveOnPlatformSeconds: number;

    @XViewColumn()
    watchedVideos: number;

    @XViewColumn()
    completedExamCount: number;

    @XViewColumn()
    answeredVideoAndPractiseQuizQuestions: number;

    @XViewColumn()
    correctAnsweredVideoAndPractiseQuizQuestions: number;

    @XViewColumn()
    averageWatchedVideosPerDay: number;

    @XViewColumn()
    averageSessionLengthSeconds: number;

    @XViewColumn()
    totalDoneExams: number;

    @XViewColumn()
    videosToBeRepeatedCount: number;

    @XViewColumn()
    correctAnswerRatePercentage: number;

    @XViewColumn()
    overallPerformancePercentage: number;
}