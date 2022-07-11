import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Company } from '../entity/Company';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserRoleAssignCompanyView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    companyId: Id<'Company'>;

    @ViewColumn()
    @XViewColumn()
    companyName: string;

    @ViewColumn()
    @XViewColumn()
    canAssign: boolean;
}