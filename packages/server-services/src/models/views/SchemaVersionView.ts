import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class SchemaVersionView {

    @XViewColumn()
    lastModificationDate: string;

    @XViewColumn()
    version: string;
}