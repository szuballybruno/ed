import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class Organization {

    @XViewColumn()
    id: Id<'Organization'>;

    @XViewColumn()
    name: string;
}