import { Id } from '@episto/commontypes';
import { XViewColumn } from '@episto/x-orm';

export class AdminUserCoursesView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    isAssigned: boolean;

    @XViewColumn()
    isAccessible: boolean;

    @XViewColumn()
    title: string;

    @XViewColumn()
    coverFilePath: string;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    correctAnswerRate: number;

    @XViewColumn()
    courseProgressPercentage: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    completedExamCount: number;

    @XViewColumn()
    totalSpentSeconds: number;

    @XViewColumn()
    answeredVideoQuestionCount: number;

    @XViewColumn()
    answeredPractiseQuestionCount: number;

    @XViewColumn()
    isFinalExamCompleted: boolean;

    @XViewColumn()
    requiredCompletionDate: Date;
}

export class UserCourseStatsViewWithTempomatData extends AdminUserCoursesView {
    previsionedCompletionDate: Date;
    lagBehindPercentage: number;
    recommendedItemsPerWeek: number;
}