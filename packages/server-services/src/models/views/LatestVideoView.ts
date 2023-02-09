import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class LatestVideoView {

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}