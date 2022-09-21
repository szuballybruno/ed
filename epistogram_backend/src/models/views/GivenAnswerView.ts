import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { ViewColumn, ViewEntity } from '../MyORM';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class GivenAnswerView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @ViewColumn()
    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @ViewColumn()
    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @ViewColumn()
    @XViewColumn()
    answerId: Id<'Answer'>;

    @ViewColumn()
    @XViewColumn()
    isCorrect: boolean;
}