import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class StorageFile {

    @XViewColumn()
    id: Id<'StorageFile'>;

    @XViewColumn()
    filePath: string;
}