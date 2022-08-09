import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class VideoVersionView {

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
}