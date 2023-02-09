import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserEngagementView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    engagementPoints: number;
}