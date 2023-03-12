import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ModuleItemCountView {

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    itemCount: number;
}