import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class Module {

    @XViewColumn()
    id: Id<'Module'>;

    @XViewColumn()
    isPretestModule: boolean;
}