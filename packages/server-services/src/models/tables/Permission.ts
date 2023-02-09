import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Permission {

    @XViewColumn()
    id: Id<'Permission'>;

    @XViewColumn()
    code: string;

    @XViewColumn()
    scope: string;
}