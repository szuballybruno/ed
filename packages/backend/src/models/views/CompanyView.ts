import { DeleteDateColumn, ViewColumn, ViewEntity } from '../MyORM';
import { DeletionDateColumn, XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class CompanyView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @DeletionDateColumn('bool')
    @DeleteDateColumn()
    isDeleted: Date;

    @XViewColumn()
    companyName: string;

    @XViewColumn()
    canManage: boolean;

    @XViewColumn()
    isSurveyRequired: boolean;
}