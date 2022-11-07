import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


export class UserRoleView {

    @XViewColumn()
    assignmentBridgeId: Id<'RoleAssignmentBridge'>;

    @XViewColumn()
    contextCompanyId: Id<'Company'>;

    @XViewColumn()
    contextCompanyName: string;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    roleName: string;

    @XViewColumn()
    assigneeUserId: Id<'User'>;

    @XViewColumn()
    isInherited: boolean;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    permissionCode: PermissionCodeType;
}