import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseItemView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    isCompleted: number;
}