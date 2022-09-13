import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { GivenAnswerStateType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ExamResultView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @ViewColumn()
    @XViewColumn()
    isFinalExam: boolean;

    @ViewColumn()
    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @ViewColumn()
    @XViewColumn()
    isCompletedSession: boolean;

    @ViewColumn()
    @XViewColumn()
    isSuccessfulSession: boolean;

    @ViewColumn()
    @XViewColumn()
    onlySuccessfulSession: boolean;

    @ViewColumn()
    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @ViewColumn()
    @XViewColumn()
    questionScore: number;
    
    @ViewColumn()
    @XViewColumn()
    questionMaxScore: number;

    @ViewColumn()
    @XViewColumn()
    givenAnswerState: GivenAnswerStateType;

    @ViewColumn()
    @XViewColumn()
    answerBridgeId: Id<'AnswerGivenAnswerBridge'>;

    @ViewColumn()
    @XViewColumn()
    userAnswerVersionId: Id<'AnswerVersion'>;

    @ViewColumn()
    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @ViewColumn()
    @XViewColumn()
    answerId: Id<'Answer'>;

    @ViewColumn()
    @XViewColumn()
    isAnswerCorrect: boolean;

    @ViewColumn()
    @XViewColumn()
    isGivenAnswer: boolean;

    @ViewColumn()
    @XViewColumn()
    answerText: string;
}