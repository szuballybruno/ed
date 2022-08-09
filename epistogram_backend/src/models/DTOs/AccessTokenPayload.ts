import { Id } from '../../shared/types/versionId';

export type AccessTokenPayload = {
    userId: Id<'User'>;
}