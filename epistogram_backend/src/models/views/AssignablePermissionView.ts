import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType, PermissionScopeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AssignablePermissionView {

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: Id<'Company'>;

    @ViewColumn()
    @XViewColumn()
    permissionId: Id<'Permission'>;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;

    @ViewColumn()
    @XViewColumn()
    permissionScope: PermissionScopeType;
}
