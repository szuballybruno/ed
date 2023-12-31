import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class VideoPlayerDataView {

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

    @XViewColumn()
    subtitle: string;

    @XViewColumn()
    title: string;

    @XViewColumn()
    description: string;

    @XViewColumn()
    thumbnailUrl: string;

    @XViewColumn()
    videoFilePath: string;
}