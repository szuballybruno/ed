import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class UserEngagementView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    engagementPoints: number;
}