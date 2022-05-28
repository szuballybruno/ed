import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class PractiseQuestionView {

    @ViewColumn()
    @XViewColumn()
    questionId: number;

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    latestGivenAnswerId: number;

    @ViewColumn()
    @XViewColumn()
    givenAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    practiseAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    questionTypeId: number;

    @ViewColumn()
    @XViewColumn()
    answerId: number;

    @ViewColumn()
    @XViewColumn()
    answerText: string;
}