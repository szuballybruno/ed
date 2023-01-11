import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class VideoRating {

    @XViewColumn()
    id: Id<'VideoRating'>;

    @XViewColumn()
    experience: number | null;

    @XViewColumn()
    difficulty: number | null;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    userId: Id<'User'>;
}