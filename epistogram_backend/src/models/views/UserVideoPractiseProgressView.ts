import { ViewColumn, ViewEntity } from 'typeorm';
import { Id } from '../../shared/types/versionId';
import { User } from '../entity/User';
import { Video } from '../entity/video/Video';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserVideoPractiseProgressView {

    @ViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    videoId: Id<'Video'>;

    @ViewColumn()
    watchPercentage: number;

    @ViewColumn()
    creationDate: Date;

    @ViewColumn()
    playbackDuration: number;
}