import { Id, TempoRatingType } from "@episto/commontypes";

export class AdminCourseUserStatsDTO {
    companyId: Id<'Company'>;
    userId: Id<'User'>;
    courseId: Id<'Course'>;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    completedPercentage: number;
    completedVideoCount: number;
    completedExamCount: number;
    videoCount: number;
    examCount: number;
    totalSpentSeconds: number;
    finalExamScorePercentage: number;
    summerizedScore: number;
    completionDate: Date | null;
    tempoPercentage: number;
    tempoRating: TempoRatingType;
    requiredCompletionDate: Date | null;
    estimatedCompletionDate: Date | null;
}

