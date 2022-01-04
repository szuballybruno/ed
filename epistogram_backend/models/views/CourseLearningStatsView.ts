import { JoinColumn, ManyToOne, ViewColumn, ViewEntity } from "typeorm";
import { User } from "../entity/User";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseLearningStatsView {

    @ViewColumn()
    id: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    canView: boolean;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    isCompleted: boolean;

    @ViewColumn()
    isStarted: boolean;

    @ViewColumn()
    currentItemCode: string;

    @ViewColumn()
    firstItemCode: string;

    @ViewColumn()
    title: string;

    @ViewColumn()
    filePath: string;

    @ViewColumn()
    categoryName: string;

    @ViewColumn()
    subCategoryName: string;

    @ViewColumn()
    teacherFirstName: string;

    @ViewColumn()
    teacherLastName: string;

    @ViewColumn()
    totalSpentTime: number;

    @ViewColumn()
    totalCourseItemCount: number;

    @ViewColumn()
    completedCourseItemCount: number;

    @ViewColumn()
    totalVideoCount: number;

    @ViewColumn()
    completedVideoCount: number;

    @ViewColumn()
    totalVideoQuestionCount: number;

    @ViewColumn()
    answeredVideoQuestionCount: number;

    @ViewColumn()
    examSuccessRateAverage: number;

    @ViewColumn()
    questionSuccessRate: number;

    @ViewColumn()
    finalExamSuccessRate: number;
}
