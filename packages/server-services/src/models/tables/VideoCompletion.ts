import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class VideoCompletion {

    @XViewColumn()
    id: Id<'VideoCompletion'>;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    userId: Id<'User'>;
}