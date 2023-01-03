import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class MigrationVersion {

    @XViewColumn()
    versionName: string | null;

    @XViewColumn()
    creationDate: Date | null;
}