import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { CourseVersion } from '../entity/course/CourseVersion';
import { ModuleVersion } from '../entity/module/ModuleVersion';
import { Video } from '../entity/video/Video';
import { VideoData } from '../entity/video/VideoData';
import { VideoVersion } from '../entity/video/VideoVersion';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class VideoPlayerDataView {

    @ViewColumn()
    @XViewColumn()
    videoId: Id<'Video'>;

    @ViewColumn()
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @ViewColumn()
    @XViewColumn()
    videoDataId: Id<'VideoData'>;

    @ViewColumn()
    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @ViewColumn()
    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @ViewColumn()
    @XViewColumn()
    subtitle: string;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    description: string;

    @ViewColumn()
    @XViewColumn()
    thumbnailUrl: string;

    @ViewColumn()
    @XViewColumn()
    videoFilePath: string;
}