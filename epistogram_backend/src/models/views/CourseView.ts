import { ViewColumn, ViewEntity } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { CourseStageNameType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseView {

    @ViewColumn()
    id: number;

    @IsDeletedFlag('bool')
    @ViewColumn()
    isDeleted: boolean;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    canView: boolean;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    isCompleted: boolean;

    @ViewColumn()
    isStarted: boolean;

    @ViewColumn()
    firstItemCode: string;

    @ViewColumn()
    currentItemCode: string;

    @ViewColumn()
    continueItemCode: string;

    @ViewColumn()
    stageName: CourseStageNameType;

    @ViewColumn()
    title: string;

    @ViewColumn()
    filePath: string;

    @ViewColumn()
    categoryName: string;

    @ViewColumn()
    subCategoryName: string;

    @ViewColumn()
    teacherFirstName: string;

    @ViewColumn()
    teacherLastName: string;
}
