import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class Group {

    @XViewColumn()
    id: Id<'Group'>;
}