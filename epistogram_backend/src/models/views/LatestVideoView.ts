import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class LatestVideoView {

    @ViewColumn()
    @XViewColumn()
    videoId: Id<'Video'>;

    @ViewColumn()
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;
}