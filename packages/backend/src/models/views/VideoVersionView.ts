import { XViewColumn } from '@episto/xorm';


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