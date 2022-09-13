import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserAssignedAuthItemView {

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    permissionId: Id<'Permission'> | null;

    @ViewColumn()
    @XViewColumn()
    roleId: Id<'Role'> | null;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: Id<'Company'>;

    @ViewColumn()
    @XViewColumn()
    isRole: boolean;
}