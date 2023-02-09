import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class RoleActivityBridge {

    @XViewColumn()
    id: Id<'RoleActivityBridge'>;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    activityId: Id<'Activity'>;
}