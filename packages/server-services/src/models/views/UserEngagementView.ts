import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserEngagementView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    engagementPoints: number;
}