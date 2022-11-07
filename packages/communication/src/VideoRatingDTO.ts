import { Id } from '@episto/commontypes';

export class VideoRatingDTO {
    experience?: number;
    difficulty?: number;
    videoVersionId: Id<'VideoVersion'>;
}