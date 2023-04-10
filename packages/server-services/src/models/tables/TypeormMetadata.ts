import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class TypeormMetadata {

    @XViewColumn()
    type: string;

    @XViewColumn()
    database: string | null;

    @XViewColumn()
    schema: string | null;

    @XViewColumn()
    table: string | null;

    @XViewColumn()
    name: string | null;

    @XViewColumn()
    value: string | null;
}