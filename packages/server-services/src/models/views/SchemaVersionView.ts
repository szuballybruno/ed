import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class SchemaVersionView {

    @XViewColumn()
    lastModificationDate: string;

    @XViewColumn()
    version: string;
}