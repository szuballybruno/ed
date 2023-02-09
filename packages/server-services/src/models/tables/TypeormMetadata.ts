import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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