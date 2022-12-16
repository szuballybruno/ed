import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class Activity {

    @XViewColumn()
    id: Id<'Activity'>;

    @XViewColumn()
    name: string;
}