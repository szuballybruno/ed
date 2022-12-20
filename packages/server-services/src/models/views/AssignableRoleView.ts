import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class AssignableRoleView {

    @XViewColumn()
    assignerUserId: Id<'AssignerUser'>;

    @XViewColumn()
    assigneeUserId: Id<'AssigneeUser'>;

    @XViewColumn()
    contextCompanyId: Id<'ContextCompany'>;

    @XViewColumn()
    contextCompanyName: string;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    roleName: string;

    @XViewColumn()
    isCustom: boolean;

    @XViewColumn()
    ownerCompanyId: Id<'OwnerCompany'>;

    @XViewColumn()
    ownerCompanyName: string;

    @XViewColumn()
    isAssigned: boolean;

    @XViewColumn()
    canAssign: boolean;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    permissionCode: string;
}