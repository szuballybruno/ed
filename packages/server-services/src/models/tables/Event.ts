import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class Event {

    @XViewColumn()
    id: Id<'Event'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    type: string;

    @XViewColumn()
    isFulfilled: boolean;

    @XViewColumn()
    data: string;

    @XViewColumn()
    userId: Id<'User'>;
}