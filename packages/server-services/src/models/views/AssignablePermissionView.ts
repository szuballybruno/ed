import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class AssignablePermissionView {

    @XViewColumn()
    assigneeUserId: Id<'AssigneeUser'>;

    @XViewColumn()
    contextCompanyId: Id<'ContextCompany'>;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    permissionCode: string;

    @XViewColumn()
    permissionScope: string;
}