import { XViewColumn } from '@episto/xorm';


export class ExamScoreView {

    @XViewColumn()
    examVersionId: number;

    // TODO
    examAcquiredPoints: number;

    // TODO
    examMaximumPoints: number;
}