import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { GivenAnswerStateType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


export class LatestExamResultView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    isFinalExam: boolean;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    isCompletedSession: boolean;

    @XViewColumn()
    isSuccessfulSession: boolean;

    @XViewColumn()
    onlySuccessfulSession: boolean;

    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @XViewColumn()
    questionScore: number;

    @XViewColumn()
    questionMaxScore: number;

    @XViewColumn()
    givenAnswerState: GivenAnswerStateType;

    @XViewColumn()
    answerBridgeId: Id<'AnswerGivenAnswerBridge'>;

    @XViewColumn()
    userAnswerVersionId: Id<'AnswerVersion'>;

    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @XViewColumn()
    answerId: Id<'Answer'>;

    @XViewColumn()
    isAnswerCorrect: boolean;

    @XViewColumn()
    isGivenAnswer: boolean;

    @XViewColumn()
    answerText: string;
}