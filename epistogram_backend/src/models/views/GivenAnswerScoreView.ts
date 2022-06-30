import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class GivenAnswerScoreView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    answerVersionId: number;

    @ViewColumn()
    @XViewColumn()
    questionVersionId: number;

    @ViewColumn()
    @XViewColumn()
    givenAnswerId: number;

    @ViewColumn()
    @XViewColumn()
    isCorrect: number;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: number;

    @ViewColumn()
    @XViewColumn()
    givenAnswerPoints: number;
}