import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class PractiseQuestionView {

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    questionTypeId: Id<'QuestionType'>;

    @XViewColumn()
    answerId: Id<'Answer'>;

    @XViewColumn()
    answerText: string;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    latestGivenAnswerId: Id<'LatestGivenAnswer'>;

    @XViewColumn()
    givenAnswerCount: number;
}