import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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