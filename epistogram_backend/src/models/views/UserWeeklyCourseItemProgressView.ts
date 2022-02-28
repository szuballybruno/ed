import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class UserWeeklyCourseItemProgressView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    completionDate: Date;

    @ViewColumn()
    isCurrent: boolean;

    @ViewColumn()
    completedItemCount: number;
}