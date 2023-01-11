import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class RoleActivityBridge {

    @XViewColumn()
    id: Id<'RoleActivityBridge'>;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    activityId: Id<'Activity'>;
}