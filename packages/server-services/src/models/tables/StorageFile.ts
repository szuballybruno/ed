import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class StorageFile {

    @XViewColumn()
    id: Id<'StorageFile'>;

    @XViewColumn()
    filePath: string;
}