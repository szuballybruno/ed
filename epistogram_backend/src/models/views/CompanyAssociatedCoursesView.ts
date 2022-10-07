import { ViewColumn, ViewEntity } from '../MyORM';
import { DeletionDateColumn, IsDeletedColumn, XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CompanyAssociatedCoursesView {

    @ViewColumn()
    @XViewColumn()
    companyId: Id<'Company'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    @IsDeletedColumn()
    isDeleted: boolean;

    @ViewColumn()
    @XViewColumn()
    isAssigned: boolean;

    @ViewColumn()
    @XViewColumn()
    isDefault: boolean;

    @ViewColumn()
    @XViewColumn()
    coverFilePath: string;

    @ViewColumn()
    @XViewColumn()
    title: string;
}