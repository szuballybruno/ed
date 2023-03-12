import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserAssignedAuthItemView {

    @XViewColumn()
    assigneeUserId: Id<'AssigneeUser'>;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    contextCompanyId: Id<'ContextCompany'>;

    @XViewColumn()
    isRole: boolean;
}