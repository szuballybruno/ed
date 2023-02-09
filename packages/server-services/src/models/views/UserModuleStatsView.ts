import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserModuleStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    moduleProgress: number;

    @XViewColumn()
    performancePercentage: number;

    @XViewColumn()
    lastExamScore: number;

    @XViewColumn()
    moduleQuestionSuccessRate: number;

    @XViewColumn()
    videosToBeRepeatedCount: number;
}