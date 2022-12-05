import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class LeaderboardView {

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    username: string;

    @XViewColumn()
    avatarFilePath: string;

    @XViewColumn()
    acquiredCoinsPastMonth: number;

    @XViewColumn()
    acquiredCoinsPastWeek: number;

    @XViewColumn()
    acquiredCoinsPastDay: number;

    @XViewColumn()
    rankMonth: number;

    @XViewColumn()
    rankWeek: number;

    @XViewColumn()
    rankDay: number;
}
