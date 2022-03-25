import { ViewColumn, ViewEntity } from "typeorm";
import { CourseItemType } from "../../shared/types/sharedTypes";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseAdminContentView {

    @ViewColumn()
    courseId: number;

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
	itemId: number;

    @ViewColumn()
	itemOrderIndex: number;

    @ViewColumn()
	itemTitle: string;

    @ViewColumn()
	itemSubtitle: string;

    @ViewColumn()
	itemCode: string;

    @ViewColumn()
	errors: string;

    @ViewColumn()
	warnings: string;

    @ViewColumn()
	videoLength: number;

    @ViewColumn()
    itemType: CourseItemType;
}