import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class RoleActivityBridge {

    @XViewColumn()
    id: Id<'RoleActivityBridge'>;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    activityId: Id<'Activity'>;
}