import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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