import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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