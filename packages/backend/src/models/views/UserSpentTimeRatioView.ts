import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


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
