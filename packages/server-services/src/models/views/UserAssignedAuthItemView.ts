import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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