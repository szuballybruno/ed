import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserCourseCompletionOriginalEstimationView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    previsionedItemsPerDay: number;

    @ViewColumn()
    previsionedDurationDays: number;

    @ViewColumn()
    previsionedCompletionDate: Date;
}