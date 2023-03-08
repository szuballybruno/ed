import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class AdminUserCourseView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    isAccessible: boolean;

    @XViewColumn()
    isAssigned: boolean;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    coverFilePath: string;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    courseProgressPercentage: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    totalSpentSeconds: number;

    @XViewColumn()
    answeredVideoQuestionCount: number;

    @XViewColumn()
    answeredPractiseQuestionCount: number;

    @XViewColumn()
    requiredCompletionDate: Date;

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

    @XViewColumn()
    differenceFromAveragePerformancePercentage: number;

    @XViewColumn()
    performancePercentage: number;

    @XViewColumn()
    avgPerformance: number;

    @XViewColumn()
    isFinalExamCompleted: boolean;

    @XViewColumn()
    correctAnswerRate: number;

    @XViewColumn()
    completedExamCount: number;

    @XViewColumn()
    recommendedVideosForPractiseCount: number;

    @XViewColumn()
    isTempomatReady: boolean;
}