import { XViewColumn } from '@episto/x-orm';


export class ExamVersionView {

    @XViewColumn()
    examId: number;

    @XViewColumn()
    examVersionId: number;

    @XViewColumn()
    examDataId: number;

    @XViewColumn()
    moduleVersionId: number;

    @XViewColumn()
    courseVersionId: number;
}