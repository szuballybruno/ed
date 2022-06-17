import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseItemEditView {

    @ViewColumn()
    @XViewColumn()
    examVersionId: number;

    @ViewColumn()
    @XViewColumn()
    videoVersionId: number;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    subtitle: string;

    @ViewColumn()
    @XViewColumn()
    videoLengthSeconds: number | null;

    @ViewColumn()
    @XViewColumn()
    videoFilePath: string | null;

    @ViewColumn()
    @XViewColumn()
    questionVersionId: number;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    questionShowUpTimeSeconds: number;

    @ViewColumn()
    @XViewColumn()
    answerVersionId: number;

    @ViewColumn()
    @XViewColumn()
    answerText: string;

    @ViewColumn()
    @XViewColumn()
    answerIsCorrect: boolean;
}