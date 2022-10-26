import { XViewColumn } from '../../services/XORM/XORMDecorators';


export class ExamScoreView {

    @XViewColumn()
    examVersionId: number;

    @XViewColumn()
    examAcquiredPoints: number;

    @XViewColumn()
    examMaximumPoints: number;
}