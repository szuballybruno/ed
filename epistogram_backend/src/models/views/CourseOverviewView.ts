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
    totalSpentSeconds: number;

    @ViewColumn()
    completedVideoCount: number;

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