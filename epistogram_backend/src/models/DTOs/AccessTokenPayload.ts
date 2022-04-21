import { UserActivityFlatView } from '../views/UserActivityFlatView';

export type AccessTokenPayload = {
    userId: number,
    userActivity: UserActivityFlatView
}