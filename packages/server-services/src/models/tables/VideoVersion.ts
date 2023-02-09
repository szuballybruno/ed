import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class VideoVersion {

    @XViewColumn()
    id: Id<'VideoVersion'>;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    videoDataId: Id<'VideoData'>;
}