import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseAdminDetailedView {

    @ViewColumn()
    id: number;
    @ViewColumn()
    title: string;
    @ViewColumn()
    categoryId: number;
    @ViewColumn()
    categoryName: string;
    @ViewColumn()
    subCategoryId: number;
    @ViewColumn()
    subCategoryName: string;
    @ViewColumn()
    teacherId: number;
    @ViewColumn()
    teacherFirstName: string;
    @ViewColumn()
    teacherLastName: string;
    @ViewColumn()
    coverFilePath: string;
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