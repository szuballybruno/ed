import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';



export class UserEngagementView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    engagementPoints: number;
}