import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class ModuleData {

    @XViewColumn()
    id: Id<'ModuleData'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    description: string;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    imageFileId: Id<'StorageFile'> | null;
}