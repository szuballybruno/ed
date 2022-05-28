import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserVideoPractiseProgressView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    watchPercentage: number;

    @ViewColumn()
    creationDate: Date;

    @ViewColumn()
    playbackDuration: number;
}