import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AnswerSessionView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: number;

    @ViewColumn()
    @XViewColumn()
    examId: number;

    @ViewColumn()
    @XViewColumn()
    isSuccessful: boolean;
}
