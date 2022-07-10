import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Answer } from '../entity/answer/Answer';
import { GivenAnswer } from '../entity/GivenAnswer';
import { QuestionVersion } from '../entity/question/QuestionVersion';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class PractiseQuestionView {

    @ViewColumn()
    @XViewColumn()
    questionVersionId: Id<QuestionVersion>;

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    latestGivenAnswerId: Id<GivenAnswer>;

    @ViewColumn()
    @XViewColumn()
    givenAnswerCount: number;

    /*     @ViewColumn()
        @XViewColumn()
        practiseAnswerCount: number; */

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    questionTypeId: number;

    @ViewColumn()
    @XViewColumn()
    answerId: Id<Answer>;

    @ViewColumn()
    @XViewColumn()
    answerText: string;
}