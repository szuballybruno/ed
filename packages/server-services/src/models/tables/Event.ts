import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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