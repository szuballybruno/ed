import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class UserCourseCompletionEstimationView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    courseLengthSeconds: number;

    @ViewColumn()
    estimatedSecondsPerDay: number;

    @ViewColumn()
    originalCompletionDaysEstimation: number;

    @ViewColumn()
    startDate: Date;

    @ViewColumn()
    estimatedCompletionDate: Date;

    @ViewColumn()
    estimatedLengthInDays: number;

    @ViewColumn()
    recommendedItemsPerDay: number;

    @ViewColumn()
    recommendedItemsPerWeek: number;

    @ViewColumn()
    itemCount: number;
}