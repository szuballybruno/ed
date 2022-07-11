import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserLearningOverviewStatsView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    userEmail: string;

    @ViewColumn()
    @XViewColumn()
    overallPerformancePercentage: number;

    @ViewColumn()
    @XViewColumn()
    engagementPoints: number;

    @ViewColumn()
    @XViewColumn()
    performancePercentage: number;

    @ViewColumn()
    @XViewColumn()
    totalUserReactionTimePoints: number;

    @XViewColumn()
    userExamLengthPoints: number;

    @ViewColumn()
    @XViewColumn()
    userReactionTimePoints: number;

    @ViewColumn()
    @XViewColumn()
    totalTimeActiveOnPlatformSeconds: number;

    @ViewColumn()
    @XViewColumn()
    watchedVideos: number;

    @ViewColumn()
    @XViewColumn()
    answeredVideoAndPractiseQuizQuestions: number;

    @ViewColumn()
    @XViewColumn()
    correctAnsweredVideoAndPractiseQuizQuestions: number;

    @ViewColumn()
    @XViewColumn()
    correctAnswerRatePercentage: number;

    @ViewColumn()
    @XViewColumn()
    userReactionTimeDifferencePercentage: number;

    @ViewColumn()
    @XViewColumn()
    averageWatchedVideosPerDay: number;

    @ViewColumn()
    @XViewColumn()
    mostFrequentTimeRange: string;

    @ViewColumn()
    @XViewColumn()
    averageSessionLengthSeconds: number;

    @ViewColumn()
    @XViewColumn()
    totalDoneExams: number;

    @ViewColumn()
    @XViewColumn()
    videosToBeRepeatedCount: number;
}
