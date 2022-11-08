import { Id } from '@episto/commontypes';

export type AccessTokenPayload = {
    userId: Id<'User'>;
}