import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class UserCourseRecommendedItemQuotaView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    recommendedItemsPerDay: number;

    @ViewColumn()
    recommendedItemsPerWeek: number;
}