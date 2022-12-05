import { XViewColumn } from '@episto/x-orm';


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