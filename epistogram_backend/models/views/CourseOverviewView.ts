import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseOverviewView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    totalSpentTime: string;

    @ViewColumn()
    completedVideoCount: string;

    @ViewColumn()
    answeredVideoQuestionCount: number;

    @ViewColumn()
    questionSuccessRate: number;

    @ViewColumn()
    examSuccessRateAverage: number;

    @ViewColumn()
    finalExamSuccessRate: number;

    @ViewColumn()
    coinsAcquired: number;
}