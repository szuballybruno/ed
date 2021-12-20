import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseAdminContentView {

    @ViewColumn()
    videoCount: number;

    @ViewColumn()
    examCount: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    itemIsVideo: boolean;

    @ViewColumn()
    itemId: number;

    @ViewColumn()
    moduleId: number;

    @ViewColumn()
    itemOrderIndex: number;

    @ViewColumn()
    itemTitle: string;

    @ViewColumn()
    itemSubtitle: string;

    @ViewColumn()
    itemCode: string;

    @ViewColumn()
    moduleName: string;

    @ViewColumn()
    moduleOrderIndex: number;

    @ViewColumn()
    moduleCode: string;

    @ViewColumn()
    itemQuestionCount: number;

    @ViewColumn()
    videoLength: number;
}