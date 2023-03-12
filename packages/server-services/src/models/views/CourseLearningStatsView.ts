import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseLearningStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    canView: boolean;

    @XViewColumn()
    isCompleted: boolean;

    @XViewColumn()
    isStarted: boolean;

    @XViewColumn()
    currentItemCode: string;

    @XViewColumn()
    continueItemCode: string;

    @XViewColumn()
    filePath: string;

    @XViewColumn()
    categoryName: string;

    @XViewColumn()
    subCategoryName: string;

    @XViewColumn()
    teacherId: Id<'Teacher'>;

    @XViewColumn()
    teacherFirstName: string;

    @XViewColumn()
    teacherLastName: string;

    @XViewColumn()
    totalSpentSeconds: number;

    @XViewColumn()
    totalCourseItemCount: number;

    @XViewColumn()
    completedCourseItemCount: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    totalVideoCount: number;

    @XViewColumn()
    totalVideoQuestionCount: number;

    @XViewColumn()
    answeredVideoQuestionCount: number;

    @XViewColumn()
    avgExamScorePercentage: number;

    @XViewColumn()
    finalExamScorePercentage: number;

    @XViewColumn()
    questionSuccessRate: number;
}