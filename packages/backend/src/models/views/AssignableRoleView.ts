import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


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
