import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class Activity {

    @XViewColumn()
    id: Id<'Activity'>;

    @XViewColumn()
    name: string;
}