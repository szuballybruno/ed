import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class ModuleItemCountView {

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    itemCount: number;
}