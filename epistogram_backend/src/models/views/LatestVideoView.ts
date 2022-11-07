import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class LatestVideoView {

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}