import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class Group {

    @XViewColumn()
    id: Id<'Group'>;
}