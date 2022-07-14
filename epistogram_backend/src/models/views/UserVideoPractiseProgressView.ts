import { ViewColumn, ViewEntity } from 'typeorm';
import { Id } from '../../shared/types/versionId';

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