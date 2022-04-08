import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseAdminShortView {

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
}