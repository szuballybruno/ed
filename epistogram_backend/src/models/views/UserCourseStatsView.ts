import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { TempomatModeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserCourseStatsView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    coverFilePath: string;

    @ViewColumn()
    @XViewColumn()
    startDate: Date;

    @ViewColumn()
    @XViewColumn()
    differenceFromAveragePerformancePercentage: number;

    @ViewColumn()
    @XViewColumn()
    correctAnswerRate: number;

    @ViewColumn()
    @XViewColumn()
    courseProgressPercentage: number;

    @ViewColumn()
    @XViewColumn()
    performancePercentage: number;

    @ViewColumn()
    @XViewColumn()
    completedVideoCount: number;

    @ViewColumn()
    @XViewColumn()
    completedExamCount: number;

    @ViewColumn()
    @XViewColumn()
    totalSpentSeconds: number;

    @ViewColumn()
    @XViewColumn()
    averagePerformanceOnCourse: number;

    @ViewColumn()
    @XViewColumn()
    answeredVideoQuestionCount: number;

    @ViewColumn()
    @XViewColumn()
    answeredPractiseQuestionCount: number;

    @ViewColumn()
    @XViewColumn()
    isFinalExamCompleted: boolean;

    @ViewColumn()
    @XViewColumn()
    requiredCompletionDate: Date;

    @ViewColumn()
    @XViewColumn()
    tempomatMode: TempomatModeType;

    @ViewColumn()
    @XViewColumn()
    originalPrevisionedCompletionDate: Date;

    @ViewColumn()
    @XViewColumn()
    totalItemCount: number;

    @ViewColumn()
    @XViewColumn()
    totalCompletedItemCount: number;

    @ViewColumn()
    @XViewColumn()
    tempomatAdjustmentValue: number;
}

export class UserCourseStatsViewWithTempomatData extends UserCourseStatsView {
    previsionedCompletionDate: Date;
    lagBehindPercentage: number;
    recommendedItemsPerWeek: number;
}