import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class UserSpentTimeRatioView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    totalExamSessionElapsedTime: number;

    @XViewColumn()
    totalVideoWatchElapsedTime: number;

    @XViewColumn()
    totalQuestionElapsedTime: number;

    @XViewColumn()
    otherTotalSpentSeconds: number;
}
