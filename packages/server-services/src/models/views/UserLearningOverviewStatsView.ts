import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class UserLearningOverviewStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    totalTimeActiveOnPlatformSeconds: number;

    @XViewColumn()
    watchedVideos: number;

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
}
