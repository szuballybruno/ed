import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseView {

    @ViewColumn()
    id: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    isComplete: boolean;

    @ViewColumn()
    isStarted: boolean;

    @ViewColumn()
    currentExamId: number;

    @ViewColumn()
    currentVideoId: number;

    @ViewColumn()
    title: string;

    @ViewColumn()
    filePath: string;

    @ViewColumn()
    category: string;
}