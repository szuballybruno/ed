import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class StorageFile {

    @XViewColumn()
    id: Id<'StorageFile'>;

    @XViewColumn()
    filePath: string;
}