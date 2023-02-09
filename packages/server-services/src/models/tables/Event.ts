import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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