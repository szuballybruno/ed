import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class VideoVersionView {

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    videoDataId: Id<'VideoData'>;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;
}