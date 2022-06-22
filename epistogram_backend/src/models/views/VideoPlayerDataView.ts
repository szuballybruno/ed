import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class VideoPlayerDataView {

    @ViewColumn()
    @XViewColumn()
    videoId: number;

    @ViewColumn()
    @XViewColumn()
    videoVersionId: number;

    @ViewColumn()
    @XViewColumn()
    videoDataId: number;

    @ViewColumn()
    @XViewColumn()
    moduleVersionId: number;

    @ViewColumn()
    @XViewColumn()
    courseVersionId: number;

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