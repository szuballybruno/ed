import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class Department {

    @XViewColumn()
    id: Id<'Department'>;

    @XViewColumn()
    name: string;
}