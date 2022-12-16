import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class SchemaVersionView {

    @XViewColumn()
    lastModificationDate: string;

    @XViewColumn()
    version: string;
}