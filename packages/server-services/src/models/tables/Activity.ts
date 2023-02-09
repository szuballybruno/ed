import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Activity {

    @XViewColumn()
    id: Id<'Activity'>;

    @XViewColumn()
    name: string;
}