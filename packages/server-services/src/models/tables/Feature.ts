import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class Feature {

    @XViewColumn()
    id: Id<'Feature'>;

    @XViewColumn()
    code: string;

    @XViewColumn()
    description: string | null;

    @XViewColumn()
    type: string;
}