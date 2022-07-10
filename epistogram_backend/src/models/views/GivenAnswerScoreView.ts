import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { AnswerVersion } from '../entity/answer/AnswerVersion';
import { AnswerSession } from '../entity/AnswerSession';
import { GivenAnswer } from '../entity/GivenAnswer';
import { QuestionVersion } from '../entity/question/QuestionVersion';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class GivenAnswerScoreView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    answerVersionId: Id<AnswerVersion>;

    @ViewColumn()
    @XViewColumn()
    questionVersionId: Id<QuestionVersion>;

    @ViewColumn()
    @XViewColumn()
    givenAnswerId: Id<GivenAnswer>;

    @ViewColumn()
    @XViewColumn()
    isCorrect: number;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: Id<AnswerSession>;

    @ViewColumn()
    @XViewColumn()
    givenAnswerPoints: number;
}