import { XViewColumn } from '../../services/XORM/XORMDecorators';


export class ExamScoreView {

    @XViewColumn()
    examVersionId: number;

    // TODO
    examAcquiredPoints: number;

    // TODO
    examMaximumPoints: number;
}