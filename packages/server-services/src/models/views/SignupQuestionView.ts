import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class SignupQuestionView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    questionId: Id<'Question'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    imageUrl: string;

    @XViewColumn()
    questionTypeId: Id<'QuestionType'>;

    @XViewColumn()
    answerId: Id<'Answer'>;

    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @XViewColumn()
    answerText: string;

    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @XViewColumn()
    isCorrect: boolean;

    @XViewColumn()
    givenAnswerVersionId: Id<'GivenAnswerVersion'>;

    @XViewColumn()
    isGivenAnswer: boolean;
}