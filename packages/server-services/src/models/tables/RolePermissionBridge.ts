import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class RolePermissionBridge {

    @XViewColumn()
    id: Id<'RolePermissionBridge'>;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    permissionId: Id<'Permission'>;
}