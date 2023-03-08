import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class AdminCourseUserStatsView {

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    firstName: string;

    @XViewColumn()
    lastName: string;

    @XViewColumn()
    avatarUrl: string;

    @XViewColumn()
    completedPercentage: number;

    @XViewColumn()
    performancePercentage: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    completedExamCount: number;

    @XViewColumn()
    videoCount: number;

    @XViewColumn()
    examCount: number;

    @XViewColumn()
    totalSpentSeconds: number;

    @XViewColumn()
    finalExamScorePercentage: number;

    @XViewColumn()
    requiredCompletionDate: Date;

    @XViewColumn()
    summerizedScore: number;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    tempomatAdjustmentValue: number;

    @XViewColumn()
    tempomatMode: string;

    @XViewColumn()
    originalPrevisionedCompletionDate: Date;

    @XViewColumn()
    totalItemCount: number;

    @XViewColumn()
    totalCompletedItemCount: number;
}