import { XViewColumn } from '@episto/x-orm';


export class ExamScoreView {

    @XViewColumn()
    examVersionId: number;

    // TODO
    examAcquiredPoints: number;

    // TODO
    examMaximumPoints: number;
}