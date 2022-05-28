import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseLearningStatsView {

    @ViewColumn()
    @XViewColumn()
    id: number;

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    courseId: number;

    @ViewColumn()
    @XViewColumn()
    canView: boolean;

    @ViewColumn()
    @XViewColumn()
    teacherId: number;

    @ViewColumn()
    @XViewColumn()
    isCompleted: boolean;

    @ViewColumn()
    @XViewColumn()
    isStarted: boolean;

    @ViewColumn()
    @XViewColumn()
    currentItemCode: string;

    @ViewColumn()
    @XViewColumn()
    firstItemCode: string;

    @ViewColumn()
    @XViewColumn()
    continueItemCode: string;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    filePath: string;

    @ViewColumn()
    @XViewColumn()
    categoryName: string;

    @ViewColumn()
    @XViewColumn()
    subCategoryName: string;

    @ViewColumn()
    @XViewColumn()
    teacherFirstName: string;

    @ViewColumn()
    @XViewColumn()
    teacherLastName: string;

    @ViewColumn()
    @XViewColumn()
    totalSpentSeconds: number;

    @ViewColumn()
    @XViewColumn()
    totalCourseItemCount: number;

    @ViewColumn()
    @XViewColumn()
    completedCourseItemCount: number;

    @ViewColumn()
    @XViewColumn()
    totalVideoCount: number;

    @ViewColumn()
    @XViewColumn()
    completedVideoCount: number;

    @ViewColumn()
    @XViewColumn()
    totalVideoQuestionCount: number;

    @ViewColumn()
    @XViewColumn()
    answeredVideoQuestionCount: number;

    @ViewColumn()
    @XViewColumn()
    examSuccessRateAverage: number;

    @ViewColumn()
    @XViewColumn()
    questionSuccessRate: number;

    @ViewColumn()
    @XViewColumn()
    finalExamSuccessRate: number;
}
