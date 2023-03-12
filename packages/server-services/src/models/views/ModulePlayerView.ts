import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ModulePlayerView {

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    imageFilePath: string;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    name: string;

    @XViewColumn()
    description: string;
}