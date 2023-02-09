import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class RolePermissionBridge {

    @XViewColumn()
    id: Id<'RolePermissionBridge'>;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    permissionId: Id<'Permission'>;
}