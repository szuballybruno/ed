import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CoinTransaction {

    @XViewColumn()
    id: Id<'CoinTransaction'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    amount: number;

    @XViewColumn()
    isGifted: boolean;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    activitySessionId: Id<'ActivitySession'> | null;

    @XViewColumn()
    videoId: Id<'Video'> | null;

    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'> | null;

    @XViewColumn()
    givenAnswerStreakId: Id<'GivenAnswerStreak'> | null;

    @XViewColumn()
    activityStreakId: Id<'ActivityStreak'> | null;

    @XViewColumn()
    shopItemId: Id<'ShopItem'> | null;
}