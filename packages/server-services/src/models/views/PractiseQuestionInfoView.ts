import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class PractiseQuestionInfoView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    questionId: Id<'Question'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    answerCount: number;

    @XViewColumn()
    practiseAnswerCount: number;

    @XViewColumn()
    givenAnswerDate: Date;

    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @XViewColumn()
    isCorrect: boolean;

    @XViewColumn()
    isPractise: boolean;
}