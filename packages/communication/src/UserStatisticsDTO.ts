import { Id, TempoRatingType } from '@episto/commontypes';
import { UserProgressChartStep } from './UserProgressChartStep';

export class UserStatisticsDTO {
    userId: Id<'User'>;
    avgReactionTimeSeconds: number;
    avgReactionTimeRating: string;
    hasInProgressCourse: boolean;
    totalActivityTimeSeconds: number;
    watchedVideoCount: number;
    answeredNonExamQuestionCount: number;
    correctAnsweredNonExamQuestionCount: number;
    avgWatchedVideoCountPerDay: number;
    progressChartSteps: UserProgressChartStep[];
    activityDistribution: {
        videoWatchActivityPercentage: number,
        examCompletionPercentage: number,
        questionAnsweringPercentage: number,
    };
    avgSessionLengthSeconds: number;
    totalCompletedExamCount: number;
    totalBadlyUnderstoodVideoCount: number;
    tempoPercentage: number;
    tempoRating: TempoRatingType;
}