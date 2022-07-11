import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { User } from '../entity/User';
import { VideoVersion } from '../entity/video/VideoVersion';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class VideoCursorSecondsView {

    @ViewColumn()
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    toSeconds: number;
}