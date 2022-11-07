import { XViewColumn } from '../../services/XORM/XORMDecorators';


export class VideoVersionView {

    @XViewColumn()
    videoId: number;

    @XViewColumn()
    videoVersionId: number;

    @XViewColumn()
    videoDataId: number;

    @XViewColumn()
    moduleVersionId: number;

    @XViewColumn()
    courseVersionId: number;
}