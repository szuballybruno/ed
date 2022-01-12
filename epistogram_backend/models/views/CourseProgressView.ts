import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseProgressView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    totalCourseItemCount: number;

    @ViewColumn()
    completedCourseItemCount: number;

    @ViewColumn()
    progressPercentage: number;

    @ViewColumn()
    courseTitle: string;

    @ViewColumn()
    continueItemCode: string;
}