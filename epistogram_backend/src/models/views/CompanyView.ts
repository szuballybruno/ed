import { DeleteDateColumn, ViewColumn, ViewEntity } from '../MyORM';
import { DeletionDateColumn, XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CompanyView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    companyId: Id<'Company'>;

    @DeletionDateColumn('bool')
    @DeleteDateColumn()
    isDeleted: Date;

    @ViewColumn()
    @XViewColumn()
    companyName: string;

    @ViewColumn()
    @XViewColumn()
    canManage: boolean;

    @ViewColumn()
    @XViewColumn()
    isSurveyRequired: boolean;
}