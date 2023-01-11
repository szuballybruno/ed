import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class Module {

    @XViewColumn()
    id: Id<'Module'>;

    @XViewColumn()
    isPretestModule: boolean;
}