import { Id } from "@episto/commontypes";

export class LeaderboardListItemDTO {
    name: string;
    userId: Id<'User'>;
    acquiredCoins: number;
    rank: number;
}