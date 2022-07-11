import { Id } from "../types/versionId";

export class VideoRatingDTO {
    experience?: number;
    difficulty?: number;
    videoVersionId: Id<'VideoVersion'>;
}