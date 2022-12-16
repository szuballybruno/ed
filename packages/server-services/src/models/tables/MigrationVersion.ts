import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class MigrationVersion {

    @XViewColumn()
    versionName: string | null;

    @XViewColumn()
    creationDate: Date | null;
}