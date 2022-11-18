import { Id } from "@episto/commontypes";

export class LeaderboardListItemDTO {
    userId: Id<'User'>;
    acquiredCoins: number;
    avatarUrl: string;
    username: string;
    rank: number;
}