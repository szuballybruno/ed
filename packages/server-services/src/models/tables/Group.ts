import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class Group {

    @XViewColumn()
    id: Id<'Group'>;
}