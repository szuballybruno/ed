import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseAdminShortView {

    @ViewColumn()
    @XViewColumn()
    id: number;

    @IsDeletedFlag('bool')
    @ViewColumn()
    @XViewColumn()
    isDeleted: boolean;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    categoryId: number;

    @ViewColumn()
    @XViewColumn()
    categoryName: string;

    @ViewColumn()
    @XViewColumn()
    subCategoryId: number;

    @ViewColumn()
    @XViewColumn()
    subCategoryName: string;

    @ViewColumn()
    @XViewColumn()
    teacherId: number;

    @ViewColumn()
    @XViewColumn()
    teacherFirstName: string;

    @ViewColumn()
    @XViewColumn()
    teacherLastName: string;

    @ViewColumn()
    @XViewColumn()
    coverFilePath: string;

    @ViewColumn()
    @XViewColumn()
    videoCount: number;

    @ViewColumn()
    @XViewColumn()
    examCount: number;
}