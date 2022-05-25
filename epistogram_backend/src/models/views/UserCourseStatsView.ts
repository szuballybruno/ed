import { ViewColumn, ViewEntity } from 'typeorm';
import { TempomatModeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserCourseStatsView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    differenceFromAveragePerformancePercentage: number;

    @ViewColumn()
    courseProgressPercentage: number;

    @ViewColumn()
    performancePercentage: number;

    @ViewColumn()
    completedVideoCount: number;

    @ViewColumn()
    completedExamCount: number;

    @ViewColumn()
    totalSpentSeconds: number;

    @ViewColumn()
    averagePerformanceOnCourse: number;

    @ViewColumn()
    answeredVideoQuestionCount: number;

    @ViewColumn()
    answeredPractiseQuestionCount: number;

    @ViewColumn()
    isFinalExamCompleted: boolean;

    @ViewColumn()
    recommendedItemsPerWeek: number;

    @ViewColumn()
    lagBehindPercentage: number;

    @ViewColumn()
    previsionedCompletionDate: Date;

    @ViewColumn()
    tempomatMode: TempomatModeType;
}