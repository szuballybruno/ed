import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class LatestVideoView {

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}