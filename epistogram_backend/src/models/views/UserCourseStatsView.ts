import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { TempomatModeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


export class AdminUserCoursesView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    isAssigned: boolean;

    @XViewColumn()
    isTempomatReady: boolean;

    @XViewColumn()
    isAccessible: boolean;

    @XViewColumn()
    title: string;

    @XViewColumn()
    coverFilePath: string;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    differenceFromAveragePerformancePercentage: number;

    @XViewColumn()
    correctAnswerRate: number;

    @XViewColumn()
    courseProgressPercentage: number;

    @XViewColumn()
    performancePercentage: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    completedExamCount: number;

    @XViewColumn()
    totalSpentSeconds: number;

    @XViewColumn()
    avgPerformance: number;

    @XViewColumn()
    answeredVideoQuestionCount: number;

    @XViewColumn()
    answeredPractiseQuestionCount: number;

    @XViewColumn()
    isFinalExamCompleted: boolean;

    @XViewColumn()
    requiredCompletionDate: Date;

    @XViewColumn()
    tempomatMode: TempomatModeType;

    @XViewColumn()
    originalPrevisionedCompletionDate: Date;

    @XViewColumn()
    totalItemCount: number;

    @XViewColumn()
    totalCompletedItemCount: number;

    @XViewColumn()
    tempomatAdjustmentValue: number;
}

export class UserCourseStatsViewWithTempomatData extends AdminUserCoursesView {
    previsionedCompletionDate: Date;
    lagBehindPercentage: number;
    recommendedItemsPerWeek: number;
}