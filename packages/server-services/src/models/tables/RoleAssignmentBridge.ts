import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class RoleAssignmentBridge {

    @XViewColumn()
    id: Id<'RoleAssignmentBridge'>;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    assigneeUserId: Id<'User'> | null;

    @XViewColumn()
    assigneeCompanyId: Id<'Company'> | null;

    @XViewColumn()
    contextCompanyId: Id<'Company'> | null;
}