import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class Module {

    @XViewColumn()
    id: Id<'Module'>;

    @XViewColumn()
    isPretestModule: boolean;
}