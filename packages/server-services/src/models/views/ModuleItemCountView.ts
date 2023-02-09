import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class ModuleItemCountView {

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    itemCount: number;
}