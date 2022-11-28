import { XViewColumn } from '@episto/xorm';
import { PermissionCodeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


export class AssignableRoleView {

    @XViewColumn()
    assignerUserId: Id<'User'>;

    @XViewColumn()
    assigneeUserId: Id<'User'>;

    @XViewColumn()
    contextCompanyId: Id<'Company'>;

    @XViewColumn()
    contextCompanyName: string;

    @XViewColumn()
    ownerCompanyId: Id<'Company'> | null;

    @XViewColumn()
    ownerCompanyName: string | null;

    @XViewColumn()
    isCustom: boolean;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    roleName: string;

    @XViewColumn()
    isAssigned: boolean;

    @XViewColumn()
    canAssign: boolean;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    permissionCode: PermissionCodeType;
}
