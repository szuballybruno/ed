import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserLatestActivityView {

    @XViewColumn()
    id: Id<'UserLatestActivity'>;

    @XViewColumn()
    email: string;

    @XViewColumn()
    totalSpentSeconds: number;

    @XViewColumn()
    latestActivityDate: Date;
}