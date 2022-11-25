import { XViewColumn } from '@episto/xorm';
import { PermissionCodeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


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