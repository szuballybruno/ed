import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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