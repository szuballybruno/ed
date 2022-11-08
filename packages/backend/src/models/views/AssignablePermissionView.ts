import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType, PermissionScopeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


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
