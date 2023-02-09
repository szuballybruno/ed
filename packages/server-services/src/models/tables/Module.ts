import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Module {

    @XViewColumn()
    id: Id<'Module'>;

    @XViewColumn()
    isPretestModule: boolean;
}