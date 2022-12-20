import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class Permission {

    @XViewColumn()
    id: Id<'Permission'>;

    @XViewColumn()
    code: string;

    @XViewColumn()
    scope: string;
}