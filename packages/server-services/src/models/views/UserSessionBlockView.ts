import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserSessionBlockView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    averageSessionBlock: string;
}