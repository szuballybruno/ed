import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Group {

    @XViewColumn()
    id: Id<'Group'>;
}