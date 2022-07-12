import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { Video } from '../entity/video/Video';
import { VideoVersion } from '../entity/video/VideoVersion';

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