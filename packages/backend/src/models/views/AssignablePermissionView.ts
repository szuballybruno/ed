import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType, PermissionScopeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


export class AssignablePermissionView {

    @XViewColumn()
    assigneeUserId: Id<'User'>;

    @XViewColumn()
    contextCompanyId: Id<'Company'>;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    permissionCode: PermissionCodeType;

    @XViewColumn()
    permissionScope: PermissionScopeType;
}
