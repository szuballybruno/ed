import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class MigrationVersion {

    @XViewColumn()
    versionName: string | null;

    @XViewColumn()
    creationDate: Date | null;
}