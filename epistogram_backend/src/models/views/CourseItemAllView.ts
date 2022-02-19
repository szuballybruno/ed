import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseItemAllView {

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    orderIndex: number;
}