import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class VideoProgressView {

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    toSeconds: number;
}