import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class UserCourseCompletionCurrentView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    previsionedItemsPerDay: number;

    @ViewColumn()
    previsionedCompletionDate: Date;

    @ViewColumn()
    previsionedLengthDays: number;

    @ViewColumn()
    startDate: Date;
}