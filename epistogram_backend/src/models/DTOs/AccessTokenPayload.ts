import { RoleType } from '../../shared/types/sharedTypes';
import { UserActivityFlatView } from '../views/UserActivityFlatView';

export type AccessTokenPayload = {
    userId: number,
    userRole: RoleType,
    userActivity: UserActivityFlatView
}