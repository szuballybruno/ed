import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class UserDailyCourseItemProgressView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    completionDate: Date;

    @ViewColumn()
    completedItemCount: number;

    @ViewColumn()
    completedPercentage: number;

    @ViewColumn()
    offsetDaysFromStart: number;
}