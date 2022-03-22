import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseAdminContentView {

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    courseTitle: string;

    @ViewColumn()
	moduleName: string;

    @ViewColumn()
	moduleOrderIndex: number;

    @ViewColumn()
	moduleId: number;

    @ViewColumn()
	moduleCode: string;

    @ViewColumn()
	videoId: number;

    @ViewColumn()
	examId: number;

    @ViewColumn()
	itemIsVideo: boolean;

    @ViewColumn()
	itemId: number;

    @ViewColumn()
	itemOrderIndex: number;

    @ViewColumn()
	itemTitle: string;

    @ViewColumn()
	itemSubtitle: string;

    @ViewColumn()
	itemIsFinalExam: boolean;

    @ViewColumn()
	itemCode: string;

    @ViewColumn()
	itemQuestionCount: number;

    @ViewColumn()
	itemHasProblems: boolean;

    @ViewColumn()
	videoLength: number;
}