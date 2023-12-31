import { Id } from '@episto/commontypes';

export class UserModuleStatsDTO {
    userId: Id<'User'>;
    courseId: Id<'Course'>;
    moduleId: Id<'Module'>;
    moduleName: string;
    moduleProgress: number;
    performancePercentage: number;
    lastExamScore: number;
    moduleQuestionSuccessRate: number;
    videosToBeRepeatedCount: number;
}